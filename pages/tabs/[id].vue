<script setup lang="ts">
  const route = useRoute()

  const data = [
    {
      id: '1',
      item: 'Beer',
      quantity: '4',
      total: 54.99,
    },
    {
      id: '2',
      item: 'Cider',
      quantity: '2',
      total: 34.99,
    },
  ]
</script>

<template>
  <div>
    <PageTitle :title="`Tab ${route.params.id}`">
      <Button @click="() => console.log('new order click')">New Order</Button>
    </PageTitle>

    <div class="grid grid-cols-5 gap-4">
      <Card
        class="col-span-5 md:col-span-3"
        title="Order Items"
      >
        <Table
          :columns="['Item', 'Price', 'Qty', 'Total']"
          :rows="data"
        />
      </Card>

      <Card
        class="col-span-5 md:col-span-2"
        title="Order History"
      >
        <span>Content</span>
      </Card>
    </div>
  </div>
</template>
