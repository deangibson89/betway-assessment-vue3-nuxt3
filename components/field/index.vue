<script setup lang="ts">
  import { defineProps, watch } from 'vue'

  const props = defineProps<{
    label?: string
    modelValue: string
    id: string
  }>()

  const emit = defineEmits(['update:modelValue'])

  watch(
    () => props.modelValue,
    (newValue) => {
      emit('update:modelValue', newValue)
    },
  )
</script>

<template>
  <div>
    <label
      class="mb-1 block text-sm font-medium text-gray-500"
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>

    <!-- eslint-disable-next-line vue/html-self-closing -->
    <input
      class="w-full rounded-md border border-neutral-200 px-3 py-1.5 text-base focus:border-white focus:outline-none focus:ring-2 focus:ring-neutral-800"
      :id
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)
      "
    />
  </div>
</template>
