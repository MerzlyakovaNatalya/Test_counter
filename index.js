const inputEl = document.querySelector("input")
const buttonEl = document.querySelector("button")
const timerEl = document.querySelector("span")

const createTimerAnimator = () => {
  let startTime = null
  let identifier = null

  const animate = () => {
    // 'performance' возвращает время в миллисекундах с высокой точностью
    const currentTime = performance.now()

    // 'elapsedTime' хранит количество секунд, прошедших между началом таймера и текущим моментом времени.
    const elapsedTime = (currentTime - startTime) / 1000

    // вычисление количества часов, прошедших с начала таймера; 3600 - количество секунд в часе
    const hours = Math.floor(elapsedTime / 3600)

    // вычисление количества минут, прошедших с начала таймера; 60 - количество секунд в минуте
    const minutes = Math.floor((elapsedTime % 3600) / 60)

    // вычисление количества секунд
    const seconds = Math.floor(elapsedTime % 60)

    // каждая строка со значением часов, минут и секунд, дополняется до двух символов с помощью метода padStart()
    timerEl.innerHTML = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

    // данная проверка позволяет контролировать длительность анимации, и остановить ее, 
    // когда достигнуто нужное значение.
      if (elapsedTime < inputSeconds) {
      identifier = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(identifier)
    }
  }

  return (seconds) => {
    inputSeconds = seconds;
    startTime = performance.now()
    animate()
  }
}

const animateTimer = createTimerAnimator()

inputEl.addEventListener("input", () => {
  
  // удаление всех символов, кроме цифр.
  inputEl.value = inputEl.value.replace(/[^\d]/g, "")
})

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value)
  
  animateTimer(seconds)

  inputEl.value = ""
})
