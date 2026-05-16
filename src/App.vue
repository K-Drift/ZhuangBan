<script setup lang="ts">
import AppShell from './components/AppShell.vue'
import BottomNav from './components/BottomNav.vue'
import LessonHydrate from './components/LessonHydrate.vue'
import PhoneFrame from './components/PhoneFrame.vue'
import { provideLessonSession } from './composables/useLessonSession'

provideLessonSession()
</script>

<template>
  <AppShell>
    <PhoneFrame>
      <LessonHydrate />
    </PhoneFrame>

    <template #nav>
      <BottomNav />
    </template>
  </AppShell>
</template>
