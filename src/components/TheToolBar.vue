<script setup lang="ts">
import type { TomatoInfo } from '~/composables/tomato'

let show = $ref(false)
const { tomatoInfos } = useTomato()
const { cloned } = useCloned(tomatoInfos)
const onInput = (e: Event, item: TomatoInfo) => {
  const value = (e.target as HTMLInputElement).value
  item.value = Number(value || '0') * 60
}

const onConfirm = () => {
  show = false
  tomatoInfos.value = tomatoInfos.value.map((item, idx) => ({
    ...item,
    value: cloned.value[idx].value,
  }))
}
</script>

<template>
  <nav text-xl inline-flex gap-2>
    <button icon-btn @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </button>
    <button icon-btn>
      <div i-carbon-settings @click="show = true" />

      <Teleport to="body">
        <div v-if="show" w-full h-full fixed top-0 left-0 flex items-start justify-center bg-hex-656c85cc>
          <div w-100 h-60 mt20 bg-hex-252529 rounded-2 flex flex-wrap flex-col justify-between flex-nowrap>
            <div v-for="item in cloned" :key="item.name" flex items-center bg-hex-656c85cc h-14 rounded-2 ma2 pa2>
              {{ item.name }}
              <input :value="item.value / 60" w-20 ml2 mr2 rounded-2 bg-hex-656c85cc pl2 @input="(e) => onInput(e, item)">分钟
            </div>
            <button btn flex items-center justify-center @click="onConfirm">
              <div>确定</div><div i-carbon-face-wink-filled />
            </button>
          </div>
        </div>
      </Teleport>
    </button>
  </nav>
</template>
