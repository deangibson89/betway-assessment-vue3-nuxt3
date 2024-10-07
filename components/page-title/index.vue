<script setup lang="ts">
  defineProps<{
    title: string
    subtitle?: string
  }>()
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight text-neutral-900">
        {{ title }}
      </h1>

      <h2
        class="tracking-none text-xl font-medium text-neutral-700"
        v-if="subtitle"
      >
        {{ subtitle }}
      </h2>
    </div>

    <slot />
  </div>
</template>
