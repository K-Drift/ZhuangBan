<script setup lang="ts">
import type { LessonStep } from '../data/steps'

defineProps<{
  steps: readonly LessonStep[]
  selectedIndex: number
}>()

const emit = defineEmits<{
  pick: [index: number]
}>()

function rowClass(i: number, selectedIndex: number) {
  return i === selectedIndex ? 'step sel' : 'step'
}
</script>

<template>
  <div role="list">
    <button
      v-for="(s, i) in steps"
      :key="s.id"
      type="button"
      :class="rowClass(i, selectedIndex)"
      role="listitem"
      @click="emit('pick', i)"
    >
      <div
        class="thumb"
        :style="s.posterSrc ? { backgroundImage: `url(${s.posterSrc})` } : {}"
        :aria-label="`${s.order}. ${s.title}`"
      />
      <div class="st">
        <b>{{ s.order }}. {{ s.title }}</b>
        <span>{{ s.goal }} · {{ s.estimate }}</span>
        <span v-if="s.branches && s.branches.length > 0" class="step-branch-badge">
          有当步人群切片选择
        </span>
      </div>
      <div aria-hidden="true">›</div>
    </button>
  </div>
</template>

<style scoped>
button.step {
  width: 100%;
  cursor: pointer;
  text-align: left;
}
</style>
