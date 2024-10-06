<script setup lang="ts">
  import type { OrderItem } from '~/types/OrderItem'

  const route = useRoute()

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Beer',
      price: 23.99,
      quantity: 4,
      total: 54.99,
    },
    {
      id: '2',
      name: 'Cider',
      price: 23.99,
      quantity: 2,
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
          :rows="orderItems.map(({ id, ...rest }) => rest)"
        />
      </Card>

      <Card
        class="col-span-5 md:col-span-2"
        title="Order History"
      >
        <OrderHistoryItem />
      </Card>
    </div>
  </div>
</template>
