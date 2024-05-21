const debounce = (fn, delay) => {
  let timer
  return function execute(...args) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(context, args), delay)
  }
}

export default debounce
