<script setup lang="ts">
  import { EllipsisVertical } from 'lucide-vue-next'

  const props = defineProps<{
    menuItems: {
      label: string
      icon: Component
      onClick: () => void
    }[]
  }>()
</script>

<template>
  <div>
    <HeadlessMenu
      class="relative inline-block"
      as="div"
    >
      <div>
        <HeadlessMenuButton
          class="flex justify-center rounded-md bg-white px-3 py-2.5 transition-all hover:bg-neutral-200"
        >
          <EllipsisVertical class="text-neutral-900" />
        </HeadlessMenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <HeadlessMenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg"
        >
          <div class="px-1 py-1">
            <HeadlessMenuItem
              v-for="(item, index) in props.menuItems"
              v-slot="{ active }"
              :key="index"
            >
              <button
                :class="[
                  active ? 'bg-neutral-100' : '',
                  'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-900',
                ]"
                @click="item.onClick"
              >
                <component
                  class="h-4 text-inherit"
                  :is="item.icon"
                />
                {{ item.label }}
              </button>
            </HeadlessMenuItem>
          </div>
        </HeadlessMenuItems>
      </transition>
    </HeadlessMenu>
  </div>
</template>
