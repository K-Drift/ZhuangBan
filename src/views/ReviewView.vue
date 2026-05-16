<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLessonSession } from '../composables/useLessonSession'
import { getClipTitle } from '../data/steps'

const router = useRouter()
const session = useLessonSession()

/** 本次选中的分支列表 */
const selectedBranches = computed(() => {
  return session.steps.value
    .map((step) => {
      if (!step.branches || step.branches.length === 0) return null
      const sel = session.branchSelections.value[step.id] || step.branches[0]!.id
      const branch = step.branches.find((b) => b.id === sel) ?? step.branches[0] ?? null
      if (!branch) return null
      return { step, branch }
    })
    .filter(Boolean) as { step: (typeof session.steps.value)[number]; branch: NonNullable<(typeof session.steps.value)[number]['branches']>[number] }[]
})

function saveDraft() {
  window.alert('保存复盘为占位交互（不接后端）。')
}

function practiceAgain() {
  session.resetForReplay()
  session.startPracticeDefault()
  router.push('/home')
}
</script>

<template>
  <div>
    <div class="brand"><span class="logo"><img src="/logo.png" alt="妆伴" /></span><span>妆伴</span></div>
    <div class="title">今日跟练复盘</div>
    <p class="sub">
      本次复盘基于已完成动作卡、当步分支选择和课代表清单生成。
    </p>

    <div class="score">
      <div>本次完成度</div>
      <div class="num">100%</div>
      <p>
        你已完成本视频生成的 {{ session.totalSteps }} 张动作卡，并在关键步骤选择了适合自己的视频切片。
      </p>
    </div>

    <div v-if="selectedBranches.length > 0" class="card pad">
      <b>本次选择的分支切片</b>
      <div style="margin-top: 12px">
        <div v-for="{ step, branch } in selectedBranches" :key="step.id" class="branch-review-item">
          <span class="branch-review-tag">{{ branch.label }}</span>
          <span>
            <b>{{ step.title }}</b>：{{ getClipTitle(branch.clip) }}
          </span>
        </div>
      </div>
    </div>

    <div class="card pad">
      <b>✅ 今日完成</b>
      <p class="sub" style="margin-top: 8px">
        · 完成本视频生成的全部动作卡。<br />
        · 在关键步骤选择了适合自己的教学切片，而不是提前选择整套方案。<br />
        · 评论区课代表清单已关联到对应步骤。
      </p>
    </div>

    <div class="card pad">
      <b>🔁 下次重点练习</b>
      <p class="sub" style="margin-top: 8px">
        · 眼线稳定度和眼尾角度。<br />
        · 修容与提亮边界过渡。<br />
        · 腮红和口红的整体协调。
      </p>
    </div>

    <div class="twobtn">
      <button type="button" class="btn btn3" @click="saveDraft">保存复盘</button>
      <button type="button" class="btn" @click="practiceAgain">再练一次</button>
    </div>
  </div>
</template>
