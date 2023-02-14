<script setup lang="ts" generic="T extends any, O extends any">
import type { TabType } from '~/components/Tabs/tabs'
import type { TomatoInfo } from '~/composables/tomato'
import { useTomato } from '~/composables/tomato'
import { showNotification } from '~/utils/notification'
defineOptions({
  name: 'IndexPage',
})
const { tomatoInfos, getTomatoInfo } = useTomato()
let curTypeInfo = $ref(tomatoInfos.value[0])
const { countTxt, isActive, rest, pause, resume } = useCountdownTime(curTypeInfo.value, onDone)

function onDone() {
  showNotification('时间到了！')
}

function toggle() {
  if (isActive.value)
    pause()
  else
    resume()
}

watch(tomatoInfos, () => {
  curTypeInfo = getTomatoInfo(curTypeInfo.type) || tomatoInfos.value[0]
  rest(curTypeInfo.value)
})

function onTypeChange(tomato: TabType<number>) {
  curTypeInfo = tomato as TomatoInfo
  rest(tomato.value)
}
</script>

<template>
  <div w-full :class="[curTypeInfo.class]" h-full relative transition-colors p-5 flex items-start justify-center flex-wrap>
    <TheToolBar absolute right-5 />
    <div w-40rem flex justify-center flex-wrap>
      <p text-white text-2rem fw-800 pb-4 mb-4 box-border border-b-4 w-full text-center>
        Vue + Tomato Clock
      </p>
      <main class="bg-white/15 w-80%" rounded-md p-30px pt-20px>
        <Tabs :type-list="tomatoInfos" @change="onTypeChange" />
        <div text-6xl sm:text-9xl font-bold text-white flex justify-center>
          {{ countTxt }}
        </div>
        <div mt-40px flex justify-center>
          <button
            class="w-[55%]" :class="{ isEnd: !isActive }" uppercase text-22px h-50px rounded-md flex
            justify-center items-center bg-white font-bold text-hex-d44b46 @click="toggle"
          >
            {{ isActive ? 'END' : 'START' }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.isEnd {
  box-shadow: #cfcfcf 0 6px;
}
</style>
