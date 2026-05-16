<script setup lang="ts">
import type { StepBranch } from '../data/steps'

const props = defineProps<{
  branchTitle: string
  branches: StepBranch[]
  selected: StepBranch | null
}>()

const emit = defineEmits<{
  select: [branchId: string]
}>()
</script>

<template>
  <div class="card pad branch-chooser">
    <div class="branch-header">
      <span class="branch-icon">👥</span>
      <b>{{ props.branchTitle }}</b>
    </div>

    <div class="branch-grid">
      <button
        v-for="branch in props.branches"
        :key="branch.id"
        type="button"
        :class="['branch-btn', { active: props.selected?.id === branch.id }]"
        @click="emit('select', branch.id)"
      >
        <div class="branch-label">{{ branch.label }}</div>
        <div class="branch-meaning">{{ branch.meaning }}</div>
      </button>
    </div>

    <div v-if="props.selected" class="branch-result">
      <div class="branch-result-header">
        <span class="branch-result-tag">{{ props.selected.label }}</span>
        <span class="branch-result-meaning">{{ props.selected.meaning }}</span>
      </div>
      <div class="branch-result-guide">{{ props.selected.guide }}</div>
    </div>
  </div>
</template>
