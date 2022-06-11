const todayDate = new Date().toISOString().slice(0, 10)

const tomorrowDate = new Date(new Date(Date.now() + 3600 * 1000 * 24))
  .toISOString()
  .slice(0, 10)

const minDate = new Date(Date.now() + 3600 * 1000 * 24 * 2)
  .toISOString()
  .slice(0, 10)

const ExpressDelivery = [
  { id: 1, name: "Today", type: "Express+", date: todayDate, price: 10.99 },
  { id: 2, name: "Tomorrow", type: "Express", date: tomorrowDate, price: 7.99 },
  { id: 2, name: "Normal", type: "Standard", date: minDate, price: 4.99 },
]

export default ExpressDelivery
