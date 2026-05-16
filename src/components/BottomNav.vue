<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

type NavKey = 'home' | 'analysis' | 'cover' | 'plan' | 'practice' | 'review'

const items = computed(() => {
  const row: readonly { key: NavKey; route: string; index: string; label: string }[] =
    [
      { key: 'home', route: '/home', index: '01', label: '导入视频链接' },
      { key: 'analysis', route: '/analysis', index: '02', label: 'AI 解析 + 课代表' },
      { key: 'cover', route: '/cover', index: '03', label: '动态封面预览' },
      { key: 'plan', route: '/plan', index: '04', label: 'N 张动作卡' },
      { key: 'practice', route: '/practice', index: '05', label: '当步分支跟练' },
      { key: 'review', route: '/review', index: '06', label: '动作复盘' },
    ]
  return row.map((x) => ({ ...x, active: route.name === x.key }))
})

function navigate(to: string) {
  router.push(to)
}
</script>

<template>
  <nav class="nav" aria-label="页面主导航">
    <button
      v-for="it in items"
      :key="it.key"
      type="button"
      :class="{ on: it.active }"
      @click="navigate(it.route)"
    >
      <small>{{ it.index }}</small>
      {{ it.label }}
    </button>
  </nav>
</template>
