<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { LessonStep } from '../data/steps'
import { getClipTitle } from '../data/steps'

const props = defineProps<{
  step: LessonStep
  /** 分支选中后的视频地址，优先于 step.videoSrc */
  activeVideoSrc?: string
}>()

const clipTitle = computed(() => getClipTitle(props.activeVideoSrc ?? props.step.videoSrc))

const videoRef = ref<HTMLVideoElement | null>(null)
/** 上一次真正写入 `<video>` 的相对路径，用于 7→8 同源不重载 */
const lastLoadedSrc = ref('')
const loadFailed = ref(false)

function resolveSrc(): string {
  return props.activeVideoSrc ?? props.step.videoSrc
}

function onVideoError(ev: Event) {
  console.warn('[PracticePlayer] 视频加载失败', resolveSrc(), ev)
  loadFailed.value = true
}

function onVideoPlaying() {
  loadFailed.value = false
}

function syncVideoSource() {
  const el = videoRef.value
  if (!el) return

  const next = resolveSrc()
  const nextPoster = props.step.posterSrc

  if (lastLoadedSrc.value !== next) {
    loadFailed.value = false
    el.src = next
    if (nextPoster) {
      el.poster = nextPoster
    } else {
      el.removeAttribute('poster')
    }
    el.load()
    lastLoadedSrc.value = next
    return
  }

  if (nextPoster !== undefined && el.poster !== nextPoster) {
    el.poster = nextPoster ?? ''
  }
}

watch(
  () => [props.step.order, props.activeVideoSrc],
  () => {
    void nextTick(() => syncVideoSource())
  },
)

onMounted(() => {
  void nextTick(() => syncVideoSource())
})
</script>

<template>
  <div class="videoBox">
    <video
      ref="videoRef"
      controls
      loop
      playsinline
      preload="metadata"
      @error="onVideoError"
      @playing="onVideoPlaying"
    />

    <div v-if="loadFailed" class="video-load-fail" role="alert">
      <p class="vf-title">未能加载本节视频</p>
      <p class="vf-body">
        当前请求地址：<code>{{ resolveSrc() }}</code>
      </p>
      <ul class="vf-list">
        <li>
          请将对应 <strong>mp4</strong> 放进 <code>public/videos/</code>，文件名与
          <code>src/data/steps.ts</code> 一致。
        </li>
        <li>
          请用终端在项目根目录执行 <code>npm run dev</code> 再通过浏览器访问本地地址；
          <strong>不要</strong>用「双击打开离线 html」，否则静态资源无法正常加载。
        </li>
      </ul>
    </div>

    <div class="vl">{{ props.step.title }} · 当前视频切片</div>
    <div class="vr">🔊 {{ clipTitle }}</div>
    <div class="vb">真人视频切片播放区。选择不同人群后，会切换到对应的视频切片与 AI 指引。</div>
  </div>
</template>

<style scoped>
.video-load-fail {
  position: absolute;
  inset: 0;
  padding: 20px;
  background: rgba(17, 17, 17, 0.92);
  color: #fafafa;
  font-size: 13px;
  line-height: 1.65;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}
.vf-title {
  margin: 0 0 10px;
  font-weight: 800;
  color: var(--r2);
  font-size: 15px;
}
.vf-body {
  margin: 0 0 10px;
  word-break: break-all;
}
.vf-body code {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.12);
  padding: 2px 6px;
  border-radius: 6px;
  color: #fecdd3;
}
.vf-list {
  margin: 0;
  padding-left: 18px;
  color: #d4d4d8;
}
.vf-list li {
  margin: 6px 0;
}
.vf-list code {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 5px;
  border-radius: 4px;
}
</style>
