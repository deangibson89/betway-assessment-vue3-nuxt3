<script setup lang="ts">
  const route = useRoute()
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
        <span>Content</span>
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
