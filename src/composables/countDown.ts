const padZero = (n: number) => (n < 10 ? `0${n}` : `${n}`)

function formatData(seconds: number) {
  const date = new Date(seconds * 1000)
  const [cM, cS] = [date.getMinutes(), date.getSeconds()]
  return `${padZero(cM)}:${padZero(cS)}`
}

export function useCountdownTime(seconds: number, onDone?: Function, immediate = false) {
  const countTxt = ref(formatData(seconds))
  const countNumber = ref(seconds)
  const { pause, resume, isActive } = useIntervalFn(() => {
    if (countNumber.value === 0) {
      pause()
      onDone && onDone()
      return
    }

    countNumber.value--
    countTxt.value = formatData(countNumber.value)
  }, 1000, { immediate })

  function rest(seconds: number) {
    countTxt.value = formatData(seconds)
    countNumber.value = seconds
    pause()
  }
  return {
    countTxt,
    pause,
    resume,
    rest,
    isActive,
  }
}
