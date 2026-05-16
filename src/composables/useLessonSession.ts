import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import {
  fetchLessonOverview,
  fetchLessonSteps,
  configuredLessonId,
  shouldUseBackendApi,
} from '../api/publicLesson'
import {
  lessonMeta as staticLessonMeta,
  lessonSteps,
  type LessonStep,
  type StepBranch,
} from '../data/steps'
import { DEFAULT_PRACTICE_STEP_INDEX } from '../constants/defaults'

/** 与各页面展示的教程元信息（coverGradient 仅前端静态） */
export interface LessonMetaUi {
  readonly title: string
  readonly sourceLabel: string
  readonly durationLabel: string
  readonly roughPracticeMinutes: string
  readonly coverGradient: string
}

export interface LessonSession {
  /** 扁平列表（模板中会解包）；由内部 ref 派生 */
  readonly steps: ComputedRef<readonly LessonStep[]>
  readonly totalSteps: ComputedRef<number>
  readonly lessonMeta: Ref<LessonMetaUi>
  readonly chips: Ref<readonly string[]>
  readonly analysisSummary: Ref<string>
  readonly remoteLoading: Ref<boolean>
  readonly hydrateError: Ref<string | null>
  readonly currentStepIndex: Ref<number>
  readonly currentStep: ComputedRef<LessonStep>
  /** 当前步骤的分支选择结果 */
  readonly currentSelectedBranch: ComputedRef<StepBranch | null>
  /** 当前生效的视频地址（有分支则取分支 clip） */
  readonly currentVideoSrc: ComputedRef<string>
  /** 当前分支的 AI 指引文案 */
  readonly currentGuide: ComputedRef<string | null>
  /** 所有步骤的分支选择记录 */
  readonly branchSelections: Ref<Record<string, string>>
  resetForReplay: () => void
  setStep: (index: number) => void
  setBranch: (stepId: string, branchId: string) => void
  startPracticeDefault: () => void
  hydrateFromBackend: () => Promise<void>
}

const KEY: InjectionKey<LessonSession> = Symbol('lessonSession')

function mapPlaylistToSteps(dto: Awaited<ReturnType<typeof fetchLessonSteps>>): LessonStep[] {
  return dto.steps.map((s) => ({
    id: s.id,
    order: s.order,
    title: s.title,
    goal: s.goal,
    estimate: s.estimate,
    videoSrc: s.videoUrl,
    posterSrc: s.posterUrl ?? undefined,
    tip: s.tip,
    loopHint: s.loopHint,
  }))
}

function getSelectedBranch(step: LessonStep, selections: Record<string, string>): StepBranch | null {
  if (!step.branches || step.branches.length === 0) return null
  const selectedId = selections[step.id] || step.branches[0]!.id
  return step.branches.find((b) => b.id === selectedId) ?? step.branches[0] ?? null
}

export function provideLessonSession(): void {
  const stepsRef = ref<readonly LessonStep[]>(lessonSteps)
  const steps = computed(() => stepsRef.value)
  const lessonMeta = ref<LessonMetaUi>({ ...staticLessonMeta })
  const chips = ref<readonly string[]>([])
  const analysisSummary = ref('')
  const remoteLoading = ref(false)
  const hydrateError = ref<string | null>(null)

  const currentStepIndex = ref<number>(0)
  const branchSelections = ref<Record<string, string>>({})

  function resetForReplay(): void {
    currentStepIndex.value = 0
    branchSelections.value = {}
  }

  function setStep(index: number): void {
    const max = Math.max(0, stepsRef.value.length - 1)
    currentStepIndex.value = Math.min(Math.max(0, index), max)
  }

  function setBranch(stepId: string, branchId: string): void {
    branchSelections.value = { ...branchSelections.value, [stepId]: branchId }
  }

  function startPracticeDefault(): void {
    const def = DEFAULT_PRACTICE_STEP_INDEX
    const max = Math.max(0, stepsRef.value.length - 1)
    setStep(def <= max ? def : 0)
  }

  const currentStep = computed((): LessonStep => {
    const arr = stepsRef.value
    return arr[currentStepIndex.value] ?? arr[0]!
  })

  const currentSelectedBranch = computed((): StepBranch | null => {
    return getSelectedBranch(currentStep.value, branchSelections.value)
  })

  const currentVideoSrc = computed((): string => {
    const branch = currentSelectedBranch.value
    return branch?.clip ?? currentStep.value.videoSrc
  })

  const currentGuide = computed((): string | null => {
    return currentSelectedBranch.value?.guide ?? null
  })

  const totalSteps = computed(() => stepsRef.value.length)

  async function hydrateFromBackend(): Promise<void> {
    if (!shouldUseBackendApi()) {
      return
    }
    const id = configuredLessonId()
    remoteLoading.value = true
    hydrateError.value = null
    try {
      const [ov, pl] = await Promise.all([fetchLessonOverview(id), fetchLessonSteps(id)])
      lessonMeta.value = {
        title: ov.lessonMeta.title,
        sourceLabel: ov.lessonMeta.sourceLabel,
        durationLabel: ov.lessonMeta.durationLabel,
        roughPracticeMinutes: ov.lessonMeta.roughPracticeMinutes,
        coverGradient: staticLessonMeta.coverGradient,
      }
      chips.value = ov.chips ?? []
      analysisSummary.value = ov.analysisSummary ?? ''
      stepsRef.value = mapPlaylistToSteps(pl)
      setStep(currentStepIndex.value)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      hydrateError.value = msg
      console.warn('[lesson] 后端拉取失败，使用本地静态数据', msg)
    } finally {
      remoteLoading.value = false
    }
  }

  const api: LessonSession = {
    steps,
    totalSteps,
    lessonMeta,
    chips,
    analysisSummary,
    remoteLoading,
    hydrateError,
    currentStepIndex,
    currentStep,
    currentSelectedBranch,
    currentVideoSrc,
    currentGuide,
    branchSelections,
    resetForReplay,
    setStep,
    setBranch,
    startPracticeDefault,
    hydrateFromBackend,
  }

  provide(KEY, api)
}

export function useLessonSession(): LessonSession {
  const s = inject(KEY)
  if (!s) {
    throw new Error('Lesson session not provided')
  }
  return s
}
