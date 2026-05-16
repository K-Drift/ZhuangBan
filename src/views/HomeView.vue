<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLessonSession } from '../composables/useLessonSession'

const router = useRouter()
const session = useLessonSession()
const lessonMeta = session.lessonMeta

const introVideo = '/videos/00_intro.mp4'

function goAnalysis() {
  router.push('/analysis')
}
</script>

<template>
  <div>
    <div class="brand"><span class="logo"><img src="/logo.png" alt="妆伴" /></span><span>妆伴</span></div>
    <div class="title">导入一条抖音精选美妆视频</div>
    <p class="sub">AI 会解析视频和评论区课代表，把内容重构成可跟练的动作卡。</p>

    <div class="card pad">
      <b>🔗 粘贴抖音精选视频链接</b>
      <div class="input">https://www.douyin.com/video/示例链接</div>
      <button type="button" class="btn" @click="goAnalysis">开始 AI 重构 →</button>
    </div>

    <div class="row">
      <b>本次 Demo 使用视频</b>
      <small style="color: #a1a1aa">已上传 · 真人美妆视频</small>
    </div>

    <div class="card">
      <div class="cover" style="position: relative; overflow: hidden; background: #111; color: white">
        <video
          :src="introVideo"
          autoplay
          muted
          loop
          playsinline
          style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.75"
        />
        <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.08))" />
        <div style="position: relative; z-index: 1">
          <span class="tag" style="background: rgba(255,255,255,0.82)">{{ lessonMeta.sourceLabel }}</span>
          <h2 style="margin: 12px 0 4px; font-size: 20px; color: white">{{ lessonMeta.title }}</h2>
          <div style="font-size: 12px; color: #fff">本视频生成 {{ session.totalSteps }} 张动作卡</div>
        </div>
        <div class="play" style="position: relative; z-index: 1">▶</div>
      </div>
      <div class="pad">
        <span class="tag">日常全妆</span>
        <span class="tag">新手友好</span>
        <span class="tag">真人讲解</span>
        <p class="sub">
          不同视频会生成不同数量动作卡。人群选择不提前做，而是在具体步骤出现时再选择对应切片。
        </p>
        <button type="button" class="btn btn2" @click="goAnalysis">体验这个视频 →</button>
      </div>
    </div>
  </div>
</template>
