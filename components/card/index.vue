<script setup lang="ts">
  defineProps<{
    title?: string
  }>()
</script>

<template>
  <div class="overflow-hidden rounded-md bg-white shadow">
    <div
      class="border-b border-neutral-200 px-6 py-4"
      v-if="title"
    >
      <h2 class="text-xl font-semibold tracking-tight text-neutral-900">
        {{ title }}
      </h2>
    </div>
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
