<script setup lang="ts">
  import { Download, Trash2 } from 'lucide-vue-next'
  import { ref } from 'vue'
  import { formatCurrency } from '~/utils/currency'
  import type { Tab } from '~/types/Tab'
  import { combineOrderItems } from '~/utils/orders'

  const route = useRoute()
  const splitBy = ref(1)

  const updateSplitBy = (value: number) => {
    splitBy.value = value
  }

  const tab: Tab = {
    id: 'tab-1',
    customer: {
      id: '1',
      name: 'John Wick',
      tableNumber: 12,
    },
    orders: [
      {
        id: 'order-1',
        items: [
          {
            id: 'beer',
            name: 'Beer',
            price: 45,
            quantity: 4,
            total: 180,
          },
          {
            id: 'cider',
            name: 'Cider',
            price: 52,
            quantity: 2,
            total: 104,
          },
        ],
        total: 284,
        createdAt: new Date(),
      },
      {
        id: 'order-2',
        items: [
          {
            id: 'premix',
            name: 'Premix',
            price: 59,
            quantity: 1,
            total: 59,
          },
        ],
        total: 59,
        createdAt: new Date(),
      },
    ],
  }

  const orderItems = combineOrderItems(tab.orders)

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
      :subtitle="`${tab.customer.name} | Table ${tab.customer.tableNumber}`"
    >
      <div class="flex gap-2">
        <Button @click="() => openNewOrderModal()"> New Order </Button>
        <ContextMenuButton
          :menu-items="[
            {
              label: 'Export PDF',
              icon: Download,
              onClick: () => {
                console.log('Export PDF clicked')
              },
            },
            {
              label: 'Export CSV',
              icon: Download,
              onClick: () => {
                console.log('Export CSV clicked')
              },
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: () => {
                console.log('Delete clicked')
              },
            },
          ]"
        />
      </div>
    </PageTitle>

    <div class="grid grid-cols-5 gap-6">
      <!-- Order items -->
      <Card
        class="col-span-5 lg:col-span-3"
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
        class="col-span-5 lg:col-span-2"
        title="Order History"
      >
        <div class="flex flex-col gap-4">
          <OrderHistoryItem
            v-for="item in tab.orders"
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
