<script setup lang="ts"></script>

<template>
  <main class="phone">
    <div class="screen">
      <header class="status" aria-hidden="true">
        <span>9:41</span>
        <span class="notch" />
        <span>100%</span>
      </header>
      <div class="phone-scroll">
        <slot />
      </div>
    </div>
  </main>
</template>
