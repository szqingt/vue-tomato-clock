<script setup lang="ts">
import type { TabType } from './tabs'

const props = defineProps<{
  typeList: TabType<any>[]
}>()

const emit = defineEmits<{
  (e: 'change', tav: TabType<any>): void
}>()

const curTypeInfo = ref(props.typeList[0])

watch(curTypeInfo, () => {
  emit('change', curTypeInfo.value)
})
</script>

<template>
  <div w-full sm:flex justify-center>
    <div
      v-for="item in props.typeList" :key="item.value"
      :class="{ 'bg-hex-2222224d': curTypeInfo.name === item.name }"
      rounded-5px cursor-pointer sm:px-4 sm:py-2
      text-2xl flex justify-center text-white box-border @click="curTypeInfo = item"
    >
      {{ item.name }}
    </div>
  </div>
</template>
