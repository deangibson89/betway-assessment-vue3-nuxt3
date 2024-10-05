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
</script>

<template>
  <div class="h-screen bg-neutral-100">
    <Header />

    <main class="container mx-auto pt-8">
      <PageTitle title="Open Tabs">
        <Button @click="() => console.log('new tab click')">New Tab</Button>
      </PageTitle>

      <div class="rounded-md bg-white p-6 shadow">
        <Table
          :columns="['ID', 'Customer', 'Table #', 'Orders', 'Total']"
          :rows="data"
          @row-click="({ id }) => router.push(`/tabs/${id}`)"
        />
      </div>
    </main>
  </div>
</template>
