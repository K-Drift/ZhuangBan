<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { commentProducts } from '../data/steps'
import { useLessonSession } from '../composables/useLessonSession'

const router = useRouter()
const session = useLessonSession()
const lessonMeta = session.lessonMeta

/** 从 commentProducts 中提取所有产品分类标签 */
const commentTags = computed(() => {
  const tags: string[] = []
  for (const products of Object.values(commentProducts)) {
    for (const p of products) {
      if (!tags.includes(p.category)) {
        tags.push(p.category)
      }
    }
  }
  return tags
})

/** 有分支的步骤数 */
const branchStepCount = computed(() =>
  session.steps.value.filter((s) => s.branches && s.branches.length > 0).length,
)

function goCover() {
  router.push('/cover')
}
</script>

<template>
  <div>
    <div class="brand"><span class="logo"><img src="/logo.png" alt="妆伴" /></span><span>妆伴</span></div>
    <div class="title">AI 已完成视频解析</div>
    <p class="sub">AI 根据视频内容生成 N 张动作卡，并标出哪些步骤需要当步选择不同人群教程。</p>

    <div class="card pad">
      <b>🎬 {{ lessonMeta.title }}</b>
      <p class="sub" style="margin-top: 12px">
        AI 根据口播文字和视频切片，拆解出妆前、粉底、遮瑕、定妆、眼影、眼线、睫毛、眉毛、修容、唇妆等动作卡。
      </p>
    </div>

    <div class="grid">
      <div class="metric">
        <small>视频类型</small>
        <b>新手全妆教程</b>
      </div>
      <div class="metric">
        <small>重构结果</small>
        <b>{{ session.totalSteps }} 张动作卡</b>
      </div>
      <div class="metric">
        <small>当步分支</small>
        <b>{{ branchStepCount }} 个关键步骤</b>
      </div>
      <div class="metric">
        <small>课代表</small>
        <b>提取产品清单</b>
      </div>
    </div>

    <div class="card pad">
      <b>✂️ AI 重构方式</b>
      <p class="sub" style="margin-top: 10px">
        1. 根据视频内容自动生成 N 张动作卡；本视频生成 {{ session.totalSteps }} 张。<br />
        2. 每张动作卡包含"你要做什么 / 为什么 / 新手提醒 / 常见错误"。<br />
        3. 当讲到粉底、眼影、眼线、修容等步骤时，再让用户选择适合自己的人群切片。
      </p>
    </div>

    <div class="card pad">
      <b>💬 评论区课代表已提取</b>
      <p class="sub" style="margin-top: 10px">
        AI 识别到"课代表 / 色号 / 同款 / 平替"类评论，并将产品、品牌、色号信息挂到对应跟练步骤下。
      </p>
      <div>
        <span v-for="c in commentTags" :key="c" class="comment-tag">{{ c }}</span>
      </div>
      <div class="comment-disclaimer">
        提示：评论区课代表信息为用户总结，非官方确认，购买前需自行核对。
      </div>
    </div>

    <button type="button" class="btn" @click="goCover">进入视频预览 →</button>
  </div>
</template>
