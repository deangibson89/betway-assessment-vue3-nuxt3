<script setup lang="ts">
  import type { Customer } from '~/types/Customer'
  import type { Order } from '~/types/Order'
  import type { OrderItem } from '~/types/OrderItem'
  import { formatCurrency } from '~/utils/currency'

  const route = useRoute()

  const customer: Customer = {
    id: '1',
    name: 'John Wick',
    tableNumber: 12,
  }

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

  const orderHistory: Order[] = [
    {
      id: '1',
      items: [],
      total: 23.99,
      createdAt: new Date(),
    },
    {
      id: '2',
      items: [],
      total: 82.5,
      createdAt: new Date(),
    },
  ]

  const orderTotal = computed(() =>
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )
</script>

<template>
  <div>
    <PageTitle
      :title="`Tab ${route.params.id}`"
      :subtitle="`${customer.name} | Table ${customer.tableNumber}`"
    >
      <Button @click="() => console.log('new order click')">New Order</Button>
    </PageTitle>

    <div class="grid grid-cols-5 gap-6">
      <!-- Order items -->
      <Card
        class="col-span-5 md:col-span-3"
        title="Order Items"
      >
        <Table
          :columns="['Item', 'Price', 'Qty', 'Total']"
          :rows="orderItems.map(({ id, ...rest }) => rest)"
        />

        <div class="mt-6">
          <h3 class="tracking-none text-lg font-semibold text-neutral-900">
            Order Total : {{ formatCurrency({ amount: orderTotal }) }}
          </h3>
        </div>
      </Card>

      <!-- Order history -->
      <Card
        class="col-span-5 md:col-span-2"
        title="Order History"
      >
        <div class="flex flex-col gap-4">
          <OrderHistoryItem
            v-for="item in orderHistory"
            v-bind="item"
            :key="item.id"
            @click="(id) => console.log(`History item ${id} click`)"
          />
        </div>
      </Card>
    </div>
  </div>
</template>
