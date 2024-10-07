<script setup lang="ts">
  const router = useRouter()

  const data = [
    {
      id: '1',
      customer: 'Bob',
      table: '4',
      orders: '6',
      total: 2389.99,
    },
    {
      id: '2',
      customer: 'Bob',
      table: '4',
      orders: '6',
      total: 2389.99,
    },
    {
      id: '3',
      customer: 'Bob',
      table: '4',
      orders: '6',
      total: 2389.99,
    },
  ]

  // New tab open state and handlers
  const isNewTabModalOpen = ref(false)
  const closeNewTabModal = () => {
    isNewTabModalOpen.value = false
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
      New tab dialog content
    </Dialog>
  </div>
</template>
