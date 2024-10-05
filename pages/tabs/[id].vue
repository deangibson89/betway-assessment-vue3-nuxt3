<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <div>
    <PageTitle :title="`Tab ${route.params.id}`">
      <Button @click="() => console.log('new order click')">New Order</Button>
    </PageTitle>

    <div class="rounded-md bg-white p-6 shadow">
      <span>Content</span>
    </div>
  </div>
</template>
