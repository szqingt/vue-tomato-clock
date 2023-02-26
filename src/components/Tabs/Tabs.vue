<script setup lang="ts" generic="T extends TabType">
import type { Ref } from 'vue'
import type { TabType } from './tabs'

const props = defineProps<{
  typeList: T[]
}>()

const emit = defineEmits<{
  (e: 'change', tab: T): void
}>()

const curTypeInfo = ref(props.typeList[0]) as Ref<T>

function onClick(tab: T) {
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
