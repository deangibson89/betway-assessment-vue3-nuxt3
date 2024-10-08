<script setup lang="ts">
  import { Download, Trash2 } from 'lucide-vue-next'
  import { ref, onMounted } from 'vue'
  import { v4 as uuid } from 'uuid'
  import { formatCurrency } from '~/utils/currency'
  import type { Tab } from '~/types/Tab'
  import {
    combineOrderItems,
    getOrderItemsFromMenu,
    getOrderItemsTotal,
  } from '~/utils/orders'
  import { createOrder, deleteTab, fetchTab } from '~/utils/storage'
  import type { Order } from '~/types/Order'

  // State variables
  const route = useRoute()
  const router = useRouter()
  const splitBy = ref(1)
  const activeOrderHistoryId = ref('')

  const menu = ref([
    {
      id: 'beer',
      name: 'Beer',
      price: 45,
      quantity: 1,
    },
    {
      id: 'cider',
      name: 'Cider',
      price: 52,
      quantity: 1,
    },
    {
      id: 'premix',
      name: 'Premix',
      price: 59,
      quantity: 1,
    },
  ])

  const tabId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id

  // Default tab data structure
  const tab = ref<Tab>({
    id: '',
    customer: {
      id: '',
      name: '',
      tableNumber: 0,
    },
    orders: [],
  })

  const fetchData = () => {
    const tabData = fetchTab(tabId)
    if (tabData) tab.value = tabData
  }

  // Lifecycle hooks
  onMounted(() => {
    fetchData()
  })

  // Computed properties
  const orderItems = computed(() => combineOrderItems(tab.value.orders))

  const orderTotal = computed(() =>
    orderItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )

  const perPersonTotal = computed(() => {
    return splitBy.value > 0 ? orderTotal.value / splitBy.value : 0
  })

  const activeOrderHistoryOrder = computed(() => {
    return tab.value.orders.filter(
      ({ id }) => id === activeOrderHistoryId.value,
    )[0]
  })

  // Event handlers
  const updateSplitBy = (value: number) => {
    splitBy.value = value
  }

  const updateActiveOrderHistoryId = (id: string) => {
    activeOrderHistoryId.value = id
  }

  const handleNewOrderSubmit = () => {
    try {
      const items = getOrderItemsFromMenu(menu.value)
      const newOrder: Order = {
        id: `order-${uuid()}`,
        items,
        total: getOrderItemsTotal(items),
        createdAt: new Date(),
      }

      createOrder(tab.value.id, newOrder)

      closeNewOrderModal()
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    const item = menu.value.find((item) => item.id === id)
    if (item) item.quantity = quantity
  }

  const handleExportPdf = () => {
    // TODO
  }

  const handleExportCsv = () => {
    // TODO
  }

  const handleDelete = () => {
    deleteTab(tab.value.id)
    router.push('/')
  }

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
      :title="`${route.params.id}`"
      :subtitle="`${tab.customer.name} | Table ${tab.customer.tableNumber}`"
    >
      <div class="flex gap-2">
        <Button @click="() => openNewOrderModal()"> New Order </Button>
        <ContextMenuButton
          :menu-items="[
            {
              label: 'Export PDF',
              icon: Download,
              onClick: handleExportPdf,
            },
            {
              label: 'Export CSV',
              icon: Download,
              onClick: handleExportCsv,
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: handleDelete,
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
          :rows="
            orderItems.map(({ id, ...rest }) => ({
              ...rest,
              total: formatCurrency({ amount: rest.total }),
            }))
          "
        />

        <!-- Order total -->
        <div class="mt-6 flex items-start justify-between">
          <div class="flex-1">
            <h3 class="tracking-none text-lg font-semibold text-neutral-900">
              Tab Total : {{ formatCurrency({ amount: orderTotal }) }}
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
            @click="
              (id) => {
                updateActiveOrderHistoryId(id)
                openOrderHistoryModal()
              }
            "
          />
        </div>
      </Card>
    </div>

    <!-- New order dialog -->
    <Dialog
      :is-open="isNewOrderModalOpen"
      @close-modal="closeNewOrderModal"
    >
      <h4 class="mb-4 text-xl font-medium tracking-tight text-neutral-900">
        New Order
      </h4>

      <div>
        <div class="mb-4 flex border-b border-neutral-100 pb-2 font-semibold">
          <span class="flex-1">Item</span>
          <span class="flex-1">Price</span>
          <span class="w-[104px]">Qty</span>
        </div>
        <div class="flex flex-col gap-2">
          <OrderItemField
            v-for="item in menu"
            :key="item.id"
            :price="item.price"
            :name="item.name"
            :quantity="item.quantity"
            @update:quantity="(qty) => updateItemQuantity(item.id, qty)"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <Button
          variant="secondary"
          @click="closeNewOrderModal"
        >
          Cancel
        </Button>
        <Button @click="handleNewOrderSubmit">Create</Button>
      </div>
    </Dialog>

    <!-- Order history item dialog -->
    <Dialog
      :is-open="isOrderHistoryModalOpen"
      @close-modal="closeOrderHistoryModal"
    >
      <h4 class="mb-4 text-xl font-medium tracking-tight text-neutral-900">
        Order Details
      </h4>

      <div class="mb-4 flex border-b border-neutral-100 pb-2 font-semibold">
        <span class="flex-1">Item</span>
        <span class="flex-1">Price</span>
        <span class="flex-1">Qty</span>
      </div>
      <div
        class="flex flex-col gap-2"
        v-if="activeOrderHistoryOrder"
      >
        <div
          class="flex text-neutral-500"
          v-for="item in activeOrderHistoryOrder.items"
          :key="item.id"
        >
          <span class="flex-1">{{ item.name }}</span>
          <span class="flex-1">
            {{ formatCurrency({ amount: item.price }) }}
          </span>
          <span class="flex-1">{{ item.quantity }}</span>
        </div>
      </div>

      <div class="mt-6">
        <h5 class="text-xl font-semibold text-neutral-800">
          Total :
          {{ formatCurrency({ amount: activeOrderHistoryOrder.total }) }}
        </h5>
      </div>
    </Dialog>
  </div>
</template>
