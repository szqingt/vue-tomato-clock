enum ClockType {
  Working,
  ShortBreak,
  LongBreak,
}

export interface TomatoInfo {
  name: string
  value: number
  type: ClockType
}

export function useTomato() {
  const tomatoInfos = useLocalStorage<TomatoInfo[]>('tomato-type', [
    {
      type: ClockType.Working,
      value: 25 * 60,
      name: 'Working',
    },
    {
      type: ClockType.ShortBreak,
      value: 5 * 60,
      name: 'Short Break',
    },
    {
      type: ClockType.LongBreak,
      value: 15 * 60,
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
