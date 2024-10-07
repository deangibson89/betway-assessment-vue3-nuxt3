<script setup lang="ts">
  import { formatCurrency } from '~/utils/currency'

  defineProps<{
    name: string
    price: number
    quantity: number
  }>()
</script>

<template>
  <div class="flex justify-between">
    <div class="flex flex-1 items-center text-base text-neutral-700">
      <span class="flex-1">{{ name }}</span>
      <span class="flex-1">{{ formatCurrency({ amount: price }) }}</span>
    </div>
    <Counter :value="quantity" />
  </div>
</template>
