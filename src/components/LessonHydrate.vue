<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useLessonSession } from '../composables/useLessonSession'

const session = useLessonSession()
onMounted(() => {
  void session.hydrateFromBackend()
})
</script>

<template>
  <RouterView />
</template>
