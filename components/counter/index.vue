<script setup lang="ts">
  import { Plus, Minus } from 'lucide-vue-next'

  const props = defineProps<{
    value?: number
  }>()

  const emit = defineEmits<{
    (e: 'update:value', value: number): void
  }>()

  const decrease = () => {
    const newValue = (props.value || 0) - 1
    if (newValue >= 1) {
      emit('update:value', newValue)
    }
  }

  const increase = () => {
    emit('update:value', (props.value || 0) + 1)
  }
</script>

<template>
  <div class="flex h-7 overflow-hidden rounded-md">
    <div
      class="flex w-10 items-center justify-center rounded-bl-md rounded-tl-md border border-neutral-200"
    >
      <span class="text-sm font-medium text-neutral-900">{{ value || 0 }}</span>
    </div>

    <div class="flex">
      <button
        class="flex w-8 items-center justify-center border-b border-t border-neutral-200 bg-white text-neutral-900 transition-all hover:bg-neutral-100"
        aria-label="Decrease split"
        @click="decrease"
      >
        <Minus class="h-4" />
      </button>
      <button
        class="flex w-8 items-center justify-center bg-neutral-900 text-white transition-all hover:bg-neutral-700"
        aria-label="Increase split"
        @click="increase"
      >
        <Plus class="h-4" />
      </button>
    </div>
  </div>
</template>
