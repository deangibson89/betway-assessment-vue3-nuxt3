<script setup lang="ts">
  import type { Order } from '~/types/Order'
  import { formatCurrency } from '~/utils/currency'
  import { getRelativeTimeFromDate, getTimeFromDate } from '~/utils/date'

  const { id, total, createdAt } = defineProps<Order>()

  defineEmits(['click'])
</script>

<template>
  <div class="flex rounded-md border border-neutral-200 p-4">
    <div class="flex-1">
      <h6 class="text-sm text-neutral-500">
        {{ getTimeFromDate(createdAt) }} |
        {{ getRelativeTimeFromDate(createdAt) }}
      </h6>
      <h4 class="text-neutral-tight text-lg font-medium leading-snug">
        {{ formatCurrency({ amount: total }) }}
      </h4>
    </div>

    <div class="flex items-center">
      <Button
        variant="link"
        size="sm"
        @click="$emit('click', id)"
      >
        View
      </Button>
    </div>
  </div>
</template>
