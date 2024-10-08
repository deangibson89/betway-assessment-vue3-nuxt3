<script setup lang="ts">
  interface TableProps<T> {
    columns: string[]
    rows: T[]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = defineProps<TableProps<any>>()

  const emit = defineEmits(['row-click'])

  const computedRows = computed(() => {
    return [...props.rows]
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = (row: any) => emit('row-click', row)
</script>

<template>
  <div class="overflow-hidden rounded-md border border-neutral-200">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="border-b border-neutral-200 py-3 text-base font-semibold text-neutral-900"
            v-for="col in props.columns"
            :key="col"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody v-if="computedRows.length > 0">
        <tr
          class="cursor-pointer hover:bg-neutral-50"
          v-for="row in computedRows"
          :key="row.id"
          @click="handleRowClick(row)"
        >
          <td
            class="py-3 text-center text-base font-light text-neutral-500 transition-all"
            v-for="key in Object.keys(row)"
            :key="key"
          >
            {{ row[key] }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td
            class="h-64 text-center text-base text-neutral-400"
            :colspan="props.columns.length"
          >
            No data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
