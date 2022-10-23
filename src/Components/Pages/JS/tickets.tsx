import { useState } from 'react';
import { TRIP_DURATION, TRIP_ONE_WAY_PRICE, TRIP_THERE_AND_BACK_PRICE } from './const'
import { ITimesState, IWay, IResult, ILocalTimes, ILocalTime } from './interface';
import { getTitleHours, getTitleTickets } from './validate.js'
import { localTimes, getLocalHours, getZero } from './time';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './tickets.css';

export const Tickets: React.FC = () => {

  const [wayState, setWayState] = useState<IWay>({ // Состояние селектора выбора направлений
    isActive : false,
    ways : [{ id : '0', text : 'из А в В' }, { id : '1', text : 'из Б в А' }, { id : '2', text : 'из A в B и обратно в А' },],
    activeWay : null,
  })

  const [startTimeState, setStartTimeState] = useState<ITimesState>({ // Состояние селектора выбора времени отправки
    isActive : false,
    start : null,
    times : null,
  })

  const [endTimeState, setEndTimeState] = useState<ITimesState>({ // Состояние селектора выбора времени на обратный путь
    isActive : false,
    start : null,
    times : null,
  })

  const [result, setResult] = useState<IResult>({ // Состояние результата
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

  const getWay = (event: React.MouseEvent<HTMLElement>) => { // Выбираем направление
    const element: HTMLElement = event.currentTarget;
    const index: string | null = element.getAttribute('id')
    if (index !== null) {
      setWayState({...wayState, activeWay : wayState.ways[+index]})
      let times:any = []
      setResult({...result, isActive : false})
      if (wayState.activeWay?.id === '0' || wayState.activeWay?.id === '2') { // В зависимости от выбранного направления формируем список возможных времен
        times = localTimes.toA
      } times = localTimes.toB
      setStartTimeState({...startTimeState, times : times})
    }
  }

  const getHoursAndMinutes = (time: number) => {
    const hours: number = Math.floor(time / 60)
    const minutes: number = time - (hours * 60)
    return { hours, minutes }
  }

  const getTime = (event: React.MouseEvent<HTMLElement>) => { // Получаем время в пути
    const element: HTMLElement = event.currentTarget

    if (wayState.activeWay?.id === '0' || wayState.activeWay?.id === '1') { // Если нужно в одну сторону

      const timeNumber: string | null = element.getAttribute('data-time')
      if (timeNumber !== null) {
        const end: number = +timeNumber + TRIP_DURATION

        const { hours, minutes } = getHoursAndMinutes(end)

        setResult({
          ...result,
          duration : { minutes : TRIP_DURATION },
          disabled : false,
          price : TRIP_ONE_WAY_PRICE,
          start : { string : element.innerText },
          end : `${getLocalHours(hours)}:${getZero(minutes)}`,
        })
      }
    } else { // Если туда и обратно
      const startNumber: string | null = element.getAttribute('data-time')

      if (startNumber !== null) {
        const nextStart = +startNumber + TRIP_DURATION

        const timesToBack: ILocalTime[] = localTimes.toA.filter((item: ILocalTime) => {
          return item.resultNumber > nextStart
        })

        setEndTimeState({ ...endTimeState, times : timesToBack, isActive : true })
        setResult({
          ...result,
          price : TRIP_THERE_AND_BACK_PRICE,
          start : { number : nextStart, string : element.innerText}
        })
      }
    }
  }

  const getTimeToBack = (event: React.MouseEvent<HTMLElement>) => { // Получаем обратный путь

    const element: HTMLElement = event.currentTarget
    const number: string | null = element.getAttribute('data-time')

    if (number !== null) {
      const end = +number + TRIP_DURATION

      const start = result.start?.number

      const { hours, minutes } = getHoursAndMinutes(end)

      setResult({
        ...result,
        duration : { hours, minutes },
        disabled : false,
        end : `${getLocalHours(hours)}:${getZero(minutes)}`,
        toBack : element.innerText
      })
    }
  }

  const TEXT =
  ` Вы выбрали ${result.countOfTickets} ${getTitleTickets(result.countOfTickets)} по маршруту ${wayState.activeWay?.text} стоимостью ${result.price * result.countOfTickets}.
    Это путешествие займет у вас ${result.duration.hours ? `${result.duration.hours} ${getTitleHours(result.duration?.hours)}` : ''} ${result.duration?.minutes} минут.
    Теплоход отправляется в ${result.start?.string}, а прибудет в ${result.end}.`

  return (
    <div className='tickets'>
      <div className='order' style={{ flexDirection : 'column' }}>
        <button type='button'
          onClick={(event: React.MouseEvent) => setResult({ ...result, isActive : !result.isActive})}
          className='direction-select select order__button'
          disabled={result.disabled}>
          { result.isActive ? 'Скрыть' : 'Получить результат' }
        </button>
        {
          result.isActive &&
          <span className='result'>{TEXT}</span>
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
              { wayState.ways?.map(item => {
                  return (
                    <li
                      className={ wayState.activeWay?.text === item.text ? 'select__option_active' : 'select__option' }
                      id={item.id}
                      onClick={getWay}
                      key={item.id}
                    >
                      {item.text}
                    </li>
                  )
                })
              }
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
              { startTimeState.times?.map((item, index) => {
                  return (
                    <li
                      className={ result.start?.string === item.resultString ? 'select__option_active' : 'select__option' }
                      onClick={getTime}
                      data-time={item.resultNumber}
                      key={index}>
                      {item.resultString}
                    </li>
                  )
                })
              }
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
                endTimeState.times?.map(item => {
                  return (
                    <li
                      className={ item.resultString === result.toBack ? 'select__option_active' : 'select__option' }
                      onClick={getTimeToBack}
                      data-time={item.resultNumber}
                    >
                      {item.resultString}
                    </li>
                  )
                }) :
                <span className='select__empty'>На сегодня рейсов нет</span>
              }
            </ul>
          }
        </div>
        <div className='filter filter__tickets'>
          <label htmlFor='count-tickets'>Количество билетов</label>
          <div className='input'>
            <FontAwesomeIcon
              icon={faMinus}
              className='filter__input_actions filter__input_actions_minus'
              onClick={(event: React.MouseEvent) => setResult({...result, countOfTickets : result.countOfTickets - 1})}
            />
            <input
              type='number'
              className='filter__input'
              min='0'
              max='30'
              value={result.countOfTickets}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setResult({...result, countOfTickets : +(event.currentTarget.value)})}
              id='count-tickets'
            />
            <FontAwesomeIcon
              icon={faPlus}
              className='filter__input_actions filter__input_actions_plus'
              onClick={(event: React.MouseEvent) => setResult({...result, countOfTickets : result.countOfTickets + 1})}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
