<script setup lang="ts" generic="T extends any, O extends any">
import type { TabType } from '~/components/Tabs/tabs'
import { showNotification } from '~/utils/notification'
defineOptions({
  name: 'IndexPage',
})

enum ClockType {
  Working,
  ShortBreak,
  LongBreak,
}

interface TypeInfo extends TabType<{
  type: ClockType
  val: number
  color: string
}> {}

const TYPE_INFOS: TypeInfo[] = [
  {
    name: 'Working',
    value: {
      type: ClockType.Working,
      val: 25 * 60,
      color: 'd44b46',
    },
  },
  {
    name: 'Short Break',
    value: {
      type: ClockType.ShortBreak,
      val: 5 * 60,
      color: '4c9195',
    },
  },
  {
    name: 'Long Break',
    value: {
      type: ClockType.LongBreak,
      val: 15 * 60,
      color: '457ca3',
    },
  },

]

let curTypeInfo = $ref(TYPE_INFOS[0])
const { countTxt, isActive, rest, pause, resume } = useCountdownTime(curTypeInfo.value.val, onDone)

function onDone() {
  showNotification('时间到了！')
}

function toggle() {
  if (isActive.value)
    pause()
  else
    resume()
}

function onTypeChange(typeInfo: TypeInfo) {
  curTypeInfo = typeInfo
  rest(typeInfo.value.val)
}

const style = computed(() => ({
  'background-color': `#${curTypeInfo.value.color}`,
}))
</script>

<template>
  <div w-full :style="style" h-90vh transition-colors p-5 flex items-start justify-center flex-wrap>
    <div w-40rem flex justify-center flex-wrap>
      <p text-white text-2rem fw-800 pb-4 mb-4 box-border border-b-4 w-full text-center>
        Vue + Tomato Clock
      </p>
      <main class="bg-white/15 w-80%" rounded-md p-30px pt-20px>
        <Tabs :type-list="TYPE_INFOS" @change="onTypeChange" />
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
  box-shadow: #ebebeb 0 6px;
}
</style>
