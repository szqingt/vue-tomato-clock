enum ClockType {
  Working,
  ShortBreak,
  LongBreak,
}

export interface TomatoInfo {
  type: ClockType
  value: number
  class: string
  name: string
}

export function useTomato() {
  const tomatoInfos = useLocalStorage<TomatoInfo[]>('tomato-type', [
    {
      type: ClockType.Working,
      value: 25 * 60,
      class: 'bg-hex-d44b46 dark:bg-inherit',
      name: 'Working',
    },
    {
      type: ClockType.ShortBreak,
      value: 5 * 60,
      class: 'bg-hex-4c9195 dark:bg-inherit',
      name: 'Short Break',
    },
    {
      type: ClockType.LongBreak,
      value: 15 * 60,
      class: 'bg-hex-457ca3 dark:bg-inherit',
      name: 'Long Break',
    },
  ])

  function getTomatoInfo(type: ClockType) {
    return tomatoInfos.value.find(v => v.type === type)
  }
  return {
    tomatoInfos,
    getTomatoInfo,
  }
}
