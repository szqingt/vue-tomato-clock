<script setup lang="ts" generic="T">
import type { TabType } from './tabs'

const props = defineProps<{
  typeList: TabType<T>[]
}>()

const emit = defineEmits<{
  (e: 'change', tab: TabType<T>): void
}>()

const curTypeInfo = ref<TabType<unknown>>(props.typeList[0])

function onClick(tab: TabType<T>) {
  curTypeInfo.value = tab
  emit('change', tab)
}
</script>

<template>
  <div w-full sm:flex justify-center>
    <div
      v-for="item in props.typeList" :key="item.name"
      :class="{ 'bg-hex-2222224d': curTypeInfo.name === item.name }"
      rounded-5px cursor-pointer sm:px-4 sm:py-2
      text-2xl flex justify-center text-white box-border @click="onClick(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
