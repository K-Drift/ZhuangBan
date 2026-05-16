/** 与后端 PublicLessonController 返回结构对齐 */

export interface LessonOverviewDto {
  id: string
  lessonMeta: {
    title: string
    sourceLabel: string
    durationLabel: string
    roughPracticeMinutes: string
  }
  status: string
  stepCount: number
  chips: string[]
  analysisSummary: string
}

export interface StepPlaylistItemDto {
  id: string
  order: number
  title: string
  cardStatus: string
  goal: string
  estimate: string
  tip: string
  loopHint: string
  videoUrl: string
  posterUrl: string | null
}

export interface StepPlaylistDto {
  lessonId: number
  totalSteps: number
  steps: StepPlaylistItemDto[]
}

function apiBase(): string {
  const b = import.meta.env.VITE_API_BASE_URL as string | undefined
  return b?.replace(/\/$/, '') ?? ''
}

export function shouldUseBackendApi(): boolean {
  return apiBase().length > 0
}

export function configuredLessonId(): string {
  const id = import.meta.env.VITE_LESSON_ID as string | undefined
  return id && id.length > 0 ? id : '1'
}

async function fetchJson<T>(path: string): Promise<T> {
  const base = apiBase()
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url)
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText}${t ? `: ${t.slice(0, 200)}` : ''}`)
  }
  return (await res.json()) as T
}

export async function fetchLessonOverview(lessonId: string): Promise<LessonOverviewDto> {
  return fetchJson<LessonOverviewDto>(`/api/lessons/${lessonId}`)
}

export async function fetchLessonSteps(lessonId: string): Promise<StepPlaylistDto> {
  return fetchJson<StepPlaylistDto>(`/api/lessons/${lessonId}/steps`)
}
