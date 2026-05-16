<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'
import AppShell from './components/AppShell.vue'
import BottomNav from './components/BottomNav.vue'
import LessonHydrate from './components/LessonHydrate.vue'
import PhoneFrame from './components/PhoneFrame.vue'
import { provideLessonSession } from './composables/useLessonSession'

provideLessonSession()
</script>

<template>
  <Analytics />
  <AppShell>
    <PhoneFrame>
      <LessonHydrate />
    </PhoneFrame>

    <template #nav>
      <BottomNav />
    </template>
  </AppShell>
</template>
