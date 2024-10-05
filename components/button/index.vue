<script setup lang="ts">
  defineEmits(['click'])
</script>

<template>
  <button
    class="rounded-md bg-green-500 px-4 py-2 text-lg font-medium text-white transition-all hover:bg-green-600"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
