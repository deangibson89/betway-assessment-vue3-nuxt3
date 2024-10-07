<script setup lang="ts">
  import { cva } from 'class-variance-authority'

  defineProps<{
    variant?: 'default' | 'link' | 'secondary'
    size?: 'default' | 'sm'
  }>()

  defineEmits(['click'])

  const button = cva('transition-all', {
    variants: {
      variant: {
        default:
          'rounded-md bg-green-500 px-4 py-2 hover:bg-green-600 text-white',
        secondary:
          'rounded-md bg-neutral-900 px-4 py-2 hover:bg-neutral-700 text-white',
        link: 'text-neutral-900 hover:text-green-600 hover:underline font-normal',
      },
      size: {
        default: 'text-lg font-medium',
        sm: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  })
</script>

<template>
  <button
    :class="button({ size, variant })"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
