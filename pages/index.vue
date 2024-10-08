<script setup lang="ts">
  import { onMounted } from 'vue'
  import { createTab, fetchAllTabs } from '~/utils/storage'
  import { v4 as uuid } from 'uuid'
  import { getTabTableDataFromTabs } from '~/utils/orders'
  import type { TabTableRow } from '~/types/Tab'

  const router = useRouter()

  const customerName = ref('')
  const tableNumber = ref('')
  const data = ref<TabTableRow[]>([])

  const fetchTabs = () => {
    const tabs = fetchAllTabs()
    console.log({ tabs })

    console.log(getTabTableDataFromTabs(tabs))
    data.value = getTabTableDataFromTabs(tabs)
  }

  onMounted(() => {
    fetchTabs()
  })

  const handleSubmit = () => {
    try {
      createTab({
        id: `tab-${uuid()}`,
        customer: {
          id: `customer-${uuid()}`,
          name: customerName.value,
          tableNumber: parseInt(tableNumber.value),
        },
        orders: [],
      })

      fetchTabs()
    } catch (error) {
      console.error(error)
    }
  }

  // New tab open state and handlers
  const isNewTabModalOpen = ref(false)
  const closeNewTabModal = () => {
    isNewTabModalOpen.value = false
    customerName.value = ''
    tableNumber.value = ''
  }
  const openNewTabModal = () => {
    isNewTabModalOpen.value = true
  }
</script>

<template>
  <div>
    <PageTitle title="Open Tabs">
      <Button @click="() => openNewTabModal()">New Tab</Button>
    </PageTitle>

    <Card>
      <Table
        :columns="['ID', 'Customer', 'Table #', 'Orders', 'Total']"
        :rows="data"
        @row-click="({ id }) => router.push(`/tabs/${id}`)"
      />
    </Card>

    <!-- New tab dialog -->
    <Dialog
      :is-open="isNewTabModalOpen"
      @close-modal="closeNewTabModal"
    >
      <h4 class="mb-4 text-xl font-medium tracking-tight text-neutral-900">
        Open New Tab
      </h4>

      <div class="flex flex-col gap-2">
        <Field
          id="customer"
          v-model="customerName"
          label="Customer name"
        />

        <Field
          id="table"
          v-model="tableNumber"
          label="Table number"
        />
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <Button
          variant="secondary"
          @click="closeNewTabModal"
        >
          Cancel
        </Button>
        <Button @click="handleSubmit">Create</Button>
      </div>
    </Dialog>
  </div>
</template>
