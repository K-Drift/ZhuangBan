<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLessonSession } from '../composables/useLessonSession'

const router = useRouter()
const session = useLessonSession()
const lessonMeta = session.lessonMeta

const introVideo = '/videos/00_intro.mp4'

function goPlan() {
  router.push('/plan')
}

function startPractice() {
  session.startPracticeDefault()
  const i = session.currentStepIndex.value
  router.push({ path: '/practice', query: { step: String(i + 1) } })
}
</script>

<template>
  <div class="cover-hero">
    <video :src="introVideo" autoplay muted loop playsinline />
    <div class="cover-shade" />
    <div class="cover-meta">
      <span>妆伴 · AI 跟练预览</span>
      <span>{{ lessonMeta.durationLabel }}</span>
    </div>
    <div class="cover-card">
      <span class="tag">{{ lessonMeta.sourceLabel }}</span>
      <div class="cover-title">{{ lessonMeta.title }}</div>
      <div class="cover-sub">
        AI 已将这条真人视频重构为 {{ session.totalSteps }} 张可跟练动作卡。讲到粉底、眼影、眼线、修容等关键步骤时，再选择适合自己的视频切片和 AI 指引。
      </div>
      <div class="cover-tags">
        <span class="tag">真人讲解</span>
        <span class="tag">{{ session.totalSteps }} 张动作卡</span>
        <span class="tag">当步分支选择</span>
        <span class="tag">课代表清单</span>
      </div>
      <div class="cover-actions">
        <button type="button" class="btn btn2" @click="goPlan">先看动作卡</button>
        <button type="button" class="btn" @click="startPractice">开始跟练 →</button>
      </div>
    </div>
  </div>
</template>
