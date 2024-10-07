<script setup lang="ts">
  import type { Customer } from '~/types/Customer'
  import type { Order } from '~/types/Order'
  import { ref } from 'vue'
  import type { OrderItem } from '~/types/OrderItem'
  import { formatCurrency } from '~/utils/currency'

  const route = useRoute()
  const splitBy = ref(1)

  const updateSplitBy = (value: number) => {
    splitBy.value = value
  }

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

  const perPersonTotal = computed(() => {
    return splitBy.value > 0 ? orderTotal.value / splitBy.value : 0
  })

  // New order modal open state and handlers
  const isNewOrderModalOpen = ref(false)
  const closeNewOrderModal = () => {
    isNewOrderModalOpen.value = false
  }
  const openNewOrderModal = () => {
    isNewOrderModalOpen.value = true
  }

  // Order history modal open state and handlers
  const isOrderHistoryModalOpen = ref(false)
  const closeOrderHistoryModal = () => {
    isOrderHistoryModalOpen.value = false
  }
  const openOrderHistoryModal = () => {
    isOrderHistoryModalOpen.value = true
  }
</script>

<template>
  <div>
    <PageTitle
      :title="`Tab ${route.params.id}`"
      :subtitle="`${customer.name} | Table ${customer.tableNumber}`"
    >
      <Button @click="() => openNewOrderModal()"> New Order </Button>
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

        <!-- Order total -->
        <div class="mt-6 flex items-start justify-between">
          <div class="flex-1">
            <h3 class="tracking-none text-lg font-semibold text-neutral-900">
              Order Total : {{ formatCurrency({ amount: orderTotal }) }}
            </h3>
            <h6
              class="tracking-none text-sm text-neutral-500"
              v-if="splitBy > 1"
            >
              Per person :
              <span class="font-medium text-neutral-700">{{
                formatCurrency({ amount: perPersonTotal })
              }}</span>
            </h6>
          </div>

          <div class="flex items-center gap-2.5">
            <span class="text-sm font-medium text-neutral-500"
              >Split bill by</span
            >
            <Counter
              :value="splitBy"
              @update:value="updateSplitBy"
            />
          </div>
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
            @click="(id) => openOrderHistoryModal()"
          />
        </div>
      </Card>

      <!-- New order dialog -->
      <Dialog
        :is-open="isNewOrderModalOpen"
        @close-modal="closeNewOrderModal"
      >
        New order dialog content
      </Dialog>

      <!-- Order history item dialog -->
      <Dialog
        :is-open="isOrderHistoryModalOpen"
        @close-modal="closeOrderHistoryModal"
      >
        Order history item dialog content
      </Dialog>
    </div>
  </div>
</template>
