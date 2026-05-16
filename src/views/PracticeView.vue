<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PracticePlayer from '../components/PracticePlayer.vue'
import BranchChooser from '../components/BranchChooser.vue'
import ProductList from '../components/ProductList.vue'
import { useLessonSession } from '../composables/useLessonSession'
import { getClipTitle } from '../data/steps'

const route = useRoute()
const router = useRouter()
const session = useLessonSession()

/** 模板对嵌套 Ref/ComputedRef 不会自动解包 */
const practiceStep = computed(() => session.currentStep.value)
const stepOrdinal = computed(() => session.currentStepIndex.value + 1)
const isLastStep = computed(
  () => session.currentStepIndex.value >= session.totalSteps.value - 1,
)
const selectedBranch = computed(() => session.currentSelectedBranch.value)
const activeVideoSrc = computed(() => session.currentVideoSrc.value)
const activeGuide = computed(() => session.currentGuide.value)
const hasBranches = computed(
  () => !!practiceStep.value.branches && practiceStep.value.branches.length > 0,
)
const branchSelections = computed(() => session.branchSelections.value)

function applyStepQuery() {
  const raw = route.query.step
  if (typeof raw !== 'string') return
  const n = Number.parseInt(raw, 10)
  if (!Number.isFinite(n) || n < 1 || n > session.totalSteps.value) return
  session.setStep(n - 1)
}

onMounted(applyStepQuery)
watch(() => route.query.step, applyStepQuery)

function completeAndNext() {
  const i = session.currentStepIndex.value
  if (i >= session.totalSteps.value - 1) {
    router.replace('/review')
    return
  }
  const next = i + 1
  session.setStep(next)
  router.replace({ path: '/practice', query: { step: String(next + 1) } })
}

function onBranchSelect(branchId: string) {
  session.setBranch(practiceStep.value.id, branchId)
}
</script>

<template>
  <div>
    <div class="row" style="margin-top: 10px">
      <div>
        <small style="color: var(--r); font-weight: 900">
          Step {{ stepOrdinal }} / {{ session.totalSteps }} · 有声短片段
        </small>
        <div class="title" style="margin-top: 4px">{{ practiceStep.title }}</div>
      </div>
      <span class="logo" aria-hidden="true"><img src="/logo.png" alt="" /></span>
    </div>

    <PracticePlayer :step="practiceStep" :active-video-src="activeVideoSrc" />

    <BranchChooser
      v-if="hasBranches"
      :branch-title="practiceStep.branchTitle!"
      :branches="practiceStep.branches!"
      :selected="selectedBranch"
      @select="onBranchSelect"
    />

    <div class="card pad">
      <b>✨ AI 跟练卡片</b>

      <div v-if="activeGuide" class="kv branch-guide">
        <small>当前人群切片指引</small>
        <div>{{ activeGuide }}</div>
      </div>

      <div v-if="practiceStep.detail" class="kv">
        <small>你要做什么</small>
        <div>{{ practiceStep.detail }}</div>
      </div>

      <div v-if="practiceStep.why" class="kv">
        <small>为什么这样做</small>
        <div>{{ practiceStep.why }}</div>
      </div>

      <div class="kv">
        <small>本节目标</small>
        <div>{{ practiceStep.goal }}</div>
      </div>
      <div class="kv">
        <small>跟练提示</small>
        <div>{{ practiceStep.tip }}</div>
      </div>

      <div v-if="practiceStep.mistake" class="kv mistake-box">
        <small>常见错误</small>
        <div>{{ practiceStep.mistake }}</div>
      </div>
    </div>

    <ProductList :product-key="practiceStep.productKey" />

    <button type="button" class="btn btn3" style="margin-top: 4px">🎙 语音指导（占位）</button>

    <button type="button" class="btn btn2" @click="completeAndNext">
      {{
        isLastStep ? '完成本课，生成复盘 ✓' : '我完成了，进入下一步 ✓'
      }}
    </button>
  </div>
</template>
