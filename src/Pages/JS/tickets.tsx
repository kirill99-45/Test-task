import { useState } from 'react';
import { IWays, ITimesState, IWay, IDuration, IResult } from './interface';
import './tickets.css';
import { localTimes, getLocalHours, getZero } from './time';

export const Tickets: React.FC = () => {

  const [wayState, setWayState] = useState<IWay>({
    isActive : false,
    ways : [{ id : '0', text : 'из А в В' }, { id : '1', text : 'из Б в А' }, { id : '2', text : 'из A в B и обратно в А' },],
    activeWay : null
  })

  const [startTimeState, setStartTimeState] = useState<ITimesState>({
    isActive : false,
    start : null,
    times : null,
  })

  const [endTimeState, setEndTimeState] = useState<ITimesState>({
    isActive : false,
    start : null,
    times : null,
  })

  const [result, setResult] = useState<IResult>({
    disabled : true,
    isActive : false,
    countOfTickets : 1,
    price : 0,
    duration: {
      hours : 0,
      minutes : 0,
    },
    start : null,
    end : null,
  })

  const TRIP_DURATION = 50 // Время в пути

  const getWay = (event: React.MouseEvent<HTMLElement>) => { // Выбираем направление
    const element: HTMLElement | any  = event.currentTarget;

    setWayState({...wayState, activeWay : wayState.ways[element.getAttribute('id')]})
    let times:string[] = []
    setResult({...result, isActive : false})
    if (wayState.activeWay?.id === '0') { // В зависимости от выбранного направления формируем список возможных времен
      times = localTimes.toA
    } else if (wayState.activeWay?.id === '1') {
      times = localTimes.toB
    } else {
      times = localTimes.toA
    }
    setStartTimeState({...startTimeState, times : times})
  }

  const getTime = (event: React.MouseEvent<HTMLElement>) => { // Получаем время в пути
    const element: HTMLElement = event.currentTarget
    if (wayState.activeWay?.id === '0' || wayState.activeWay?.id === '1') { // Если нужно в одну сторону

      let end = +(element.innerText
        .split(':')
        .map((item, index) => index === 0 ? +item * 60 : +item)
        .reduce((acc, item) => acc + item)) + TRIP_DURATION

      const hours = Math.floor(end / 60)
      const minutes = end - (hours * 60)

      setResult({
        ...result,
        duration : { minutes : TRIP_DURATION },
        disabled : false,
        price : 700,
        start : element.innerText,
        end : `${getLocalHours(hours)}:${getZero(minutes)}`,
      })
    } else { // Если туда и обратно
      const nextStart = +(element.innerText
        .split(':')
        .map((item, index) => index === 0 ? +item * 60 : +item)
        .reduce((acc, item) => acc + item)) + TRIP_DURATION

      const timesToReturn = localTimes.toA // Устанавливаем возможные времена пути обратно
        .map((item: string) => {
          return item.split(':').map((item: string, index: number) => {
            return index === 0 ? +item * 60 : +item
          }).reduce((acc: number, item: number) => acc + item)
        })
        .filter((item: number) => item >= nextStart)
        .map((item: number) => {
          const hours = Math.floor(item / 60)
          const minutes = item - (hours * 60)
          return `${hours}:${getZero(minutes)}`
      })

      setEndTimeState({ ...endTimeState, times : timesToReturn })
      setResult({
        ...result,
        price : 1200,
        start : { number : nextStart, string : element.innerText}
      })
    }
  }

  const getString = (number) => {
    const hours: number = Math.floor(number / 60)
    const minutes: number = ((number) - (hours * 60))
    return `${hours}:${minutes}`
  }

  const getTimeToReturn = (event: React.MouseEvent<HTMLElement>) => { // Получаем обратный путь
    const element: HTMLElement = event.currentTarget

    const end: number = +(element.innerText.split(':').map((item, index) => {
      return index === 0 ? +item * 60 : +item
    }).reduce((acc, item) => acc + item))

    const start: number | any | string = result.start.number

    const hours: number = Math.floor((end - start + 100) / 60)
    const minutes: number = ((end - start + 100) - (hours * 60))

    setResult({
      ...result,
      duration : { hours, minutes },
      disabled : false,
      end : `${getLocalHours(Math.floor((end + 50) / 60))}:${getZero((end + 50) - (Math.floor((end + 50) / 60) * 60))}`,
    })
  }


  const getResult = (event: React.MouseEvent) => {
    setResult({ ...result, isActive : !result.isActive})
  }

  const getCountOfTickets = (event:  React.ChangeEvent<HTMLInputElement>) => {
    setResult({...result, countOfTickets : +(event.currentTarget.value)})
  }

  return (
    <>
      <div className='order' style={{ flexDirection : 'column' }}>
        <button type='button' onClick={getResult} disabled={result.disabled}>
          { result.isActive ? 'Скрыть' : 'Получить результат' }
        </button>
        {
          result.isActive &&
          <span>
            Вы выбрали {result.countOfTickets} билета по маршруту из {wayState.activeWay?.text}
            стоимостью {result.price * result.countOfTickets}.
            Это путешествие займет у вас {result.duration.hours ? `${result.duration.hours} часов` : ''} {result.duration?.minutes} минут
            Теплоход отправляется в {result.start.string}, а прибудет в {result.end}.
          </span>
        }
      </div>
      <div className='filters'>
        <div className='filter'>
          <button
            className='direction-select select'
            onClick={() => setWayState({...wayState, isActive : !wayState.isActive})}
          >
            Выбрать направление
          </button>
          {
            wayState.isActive &&
            <ul className='direction-select__options select__options'>
              {wayState.ways?.map(item => <li className='select__option' id={item.id} onClick={getWay}>{item.text}</li>)}
            </ul>
          }
        </div>
        <div className='filter'>
          <button
            className='leaving-select select'
            disabled={startTimeState.times === null}
            onClick={() => setStartTimeState({...startTimeState, isActive : !startTimeState.isActive})}
          >
            Время отправление
          </button>
          {
            startTimeState.isActive &&
            <ul className='leaving-select__options select__options'>
              {startTimeState.times?.map(item => <li className='select__option' onClick={getTime}>{item}</li>)}
            </ul>
          }
        </div>
        <div className='filter'>
          {
            wayState.activeWay?.text === 'из A в B и обратно в А' &&
            <button
              className='leaving-select select'
              disabled={endTimeState.times === null}
              onClick={() => setEndTimeState({...endTimeState, isActive: !endTimeState.isActive})}
            >
              Время отбытия
            </button>
          }
          {
            endTimeState.isActive &&
            <ul className='leaving-select__options select__options'>
              {
                endTimeState.times !== null && endTimeState.times?.length > 0 ?
                endTimeState.times?.map(item => <li className='select__option' onClick={getTimeToReturn}>{item}</li>) :
                <span className='select__empty'>На сегодня рейсов нет</span>
              }
            </ul>
          }
        </div>
        <div className='filter'>
          <label htmlFor='count-tickets'>Количество билетов</label>
          <input type='number'
            className='filter__input'
            min='0'
            max='30'
            value={result.countOfTickets}
            onChange={getCountOfTickets}
            id='count-tickets'
          />
        </div>
      </div>
    </>
  )
}
