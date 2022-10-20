const date = new Date()
const hoursUTC = date.getUTCHours()

const dateUTC = (date.getUTCHours() * 60) + date.getUTCMinutes()

const localTime = (date.getHours() * 60) + date.getMinutes()

const differenceHours = (Math.floor((localTime - dateUTC) / 60)) - 3

const differenceMinutes = ((localTime - dateUTC - 180) - (differenceHours * 60))


export const getZero = (time: number) => {
  return time > 9 ? time : `0${time}`
}

export const getLocalHours = (hours: number) => {
  if (hours >= 24) {
    return hours - 24 > 9 ? hours - 24 : `0${hours - 24}`
  } return hours > 9 ? hours : `0${hours}`
}

const MoscowTimes:any = {
  toA : ['18:00', '18:30', '18:45', '19:00', '19:15', '21:00'],
  toB : ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'],
}

export const localTimes:any = {}

Object.keys(MoscowTimes).map((item: string) => {
  return localTimes[item] = MoscowTimes[item].map((item: string) => {
    return item.split(':').map((item, index) => {
      if (index === 0) {
        return getLocalHours(+item + differenceHours)
      } return differenceMinutes > 0 ? getZero(+item + differenceMinutes) : getZero(+item)
    }).join(':')
  }).sort((a: number, b: number) => a > b ? 1 : -1)
})
