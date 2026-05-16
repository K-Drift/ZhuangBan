<script setup lang="ts">
import { computed } from 'vue'
import { commentProducts, type CommentProduct } from '../data/steps'

const props = defineProps<{
  productKey?: string
}>()

const products = computed<CommentProduct[]>(() => {
  if (!props.productKey) return []
  return commentProducts[props.productKey] ?? []
})

const hasProducts = computed(() => products.value.length > 0)
</script>

<template>
  <div class="card pad product-list">
    <div class="product-header">
      <span class="product-icon">💬</span>
      <b>评论区课代表清单</b>
    </div>

    <template v-if="hasProducts">
      <div class="product-items">
        <div v-for="p in products" :key="`${p.category}-${p.name}`" class="product-item">
          <div class="product-category">{{ p.category }}</div>
          <div class="product-name">{{ p.name }}</div>
          <div class="product-note">{{ p.note }}</div>
        </div>
      </div>
      <div class="product-disclaimer">
        来自评论区用户总结，非官方确认，购买前请自行核对。
      </div>
    </template>

    <div v-else class="product-empty">
      本步骤暂无明确课代表产品信息，先专注跟练手法。
    </div>
  </div>
</template>
