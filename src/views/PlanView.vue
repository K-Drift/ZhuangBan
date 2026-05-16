<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StepList from '../components/StepList.vue'
import { useLessonSession } from '../composables/useLessonSession'

const router = useRouter()
const session = useLessonSession()

const stepsForList = computed(() => [...session.steps.value])

const selectedIndex = computed(() => session.currentStepIndex.value)

const branchStepCount = computed(() =>
  session.steps.value.filter((s) => s.branches && s.branches.length > 0).length,
)

function onPick(index: number) {
  session.setStep(index)
  router.push({ path: '/practice', query: { step: String(index + 1) } })
}

function startDefault() {
  session.startPracticeDefault()
  const i = session.currentStepIndex.value
  router.push({ path: '/practice', query: { step: String(i + 1) } })
}
</script>

<template>
  <div>
    <div class="brand"><span class="logo"><img src="/logo.png" alt="妆伴" /></span><span>妆伴</span></div>
    <div class="title">本视频的 {{ session.totalSteps }} 张动作卡</div>
    <p class="sub">人群选择不会提前打断流程；只有讲到需要分支的步骤时，才会出现对应选择。</p>
    <p v-if="branchStepCount > 0" class="sub" style="margin-top: 0">
      其中 <strong>{{ branchStepCount }}</strong> 个步骤支持当步选择不同人群切片，到那一步时再选即可。
    </p>

    <StepList
      :steps="stepsForList"
      :selected-index="selectedIndex"
      @pick="onPick"
    />

    <button type="button" class="btn" @click="startDefault">从第 1 步开始跟练 ▶</button>
  </div>
</template>
