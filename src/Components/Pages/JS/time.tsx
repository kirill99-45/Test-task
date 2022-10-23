import { ILocalTime, ILocalTimes, IMoscowTimes } from './interface'

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

const MoscowTimes: IMoscowTimes = {
  toA : ['18:00', '18:30', '18:45', '19:00', '19:15', '21:00'],
  toB : ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'],
}

const getMoscowTimes = (str: string) => {
   const resultString = str.split(':').map((item, index) => {
     return index === 0 ? getLocalHours(+item + differenceHours) : (differenceMinutes > 0 ? getZero(+item + differenceMinutes) : getZero(+item))
   })

   const resultNumber = resultString.map((item, index) => index === 0 ? +item * 60 : +item).reduce((acc, item) => acc + item)
   return { resultString : resultString.join(':'), resultNumber }
}

export const localTimes:ILocalTimes | any = {}

Object.keys(MoscowTimes).map(key => {
  return localTimes[key] = MoscowTimes[key as keyof IMoscowTimes].map((item) => {
    return getMoscowTimes(item)
  }).sort((a: ILocalTime, b: ILocalTime) => a.resultNumber > b.resultNumber ? 1 : -1)
})
