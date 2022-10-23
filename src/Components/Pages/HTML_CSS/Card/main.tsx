import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Footer } from './footer';
import { Times } from './times';

interface IMainProps {
  title : string,
  duration : string,
  content : string[],
  times : string[],
  total : number,
  pier? : number,
}

export const Main: React.FC<IMainProps> = ({ duration, title, content, times, total, pier }) => {

  const OPTION_WIDTH = 58;
  const TIMES_MARGIN_LEFT = window.innerWidth > 700 ? 145 : 36
  const minCount = window.innerWidth > 700 ? 3 : 2

  const optionsRef= useRef<HTMLLIElement | null>(null)

  const [countOfVisibleTimes, setCountOfVisibleTimes] = useState<number>(minCount)

  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    if (optionsRef.current !== null) {
      const canContain: number = Math.floor((optionsRef.current.clientWidth - TIMES_MARGIN_LEFT) / (OPTION_WIDTH + 4))
      setCountOfVisibleTimes(canContain > times.length ? times.length : canContain - 1)
    }
  }, [])

  useEffect(() => {
    const getInnerWidth = () => {
      if (window.innerWidth - innerWidth > OPTION_WIDTH) {
        setInnerWidth(window.innerWidth)
        setCountOfVisibleTimes(countOfVisibleTimes + 1)
      } else if ((window.innerWidth - innerWidth < -58) && countOfVisibleTimes > minCount) {
        setCountOfVisibleTimes(countOfVisibleTimes - 1)
        setInnerWidth(window.innerWidth)
      }
    }

    window.addEventListener('resize', getInnerWidth)

    return () => {
      window.removeEventListener('resize', getInnerWidth)
    }
  })

  return (
    <main className='card__main'>
      <div className='card__duration'>
        <FontAwesomeIcon icon={faClock}/>
        <span className='card__time'>{duration}</span>
      </div>
      <h3 className='card__title'>{title}</h3>
      <ul className='card__content'>
        {
          content?.map((item, index) => {
            return (
              <li key={index} className='card__content-item'>
                <FontAwesomeIcon icon={faCheck} className='card__check'/>
                <span className='card__description'>{item}</span>
              </li>
            )
          })
        }
        <li className='card__content-item' ref={optionsRef}>
          <FontAwesomeIcon icon={faCheck} className='card__check'/>
          <div className='card__times times'>
            <span className='card__description'>Ближайшие рейсы</span>
            <div className='times__options'>
              <Times
                times={times}
                countOfVisibleTimes={countOfVisibleTimes}
              />
              {
                countOfVisibleTimes < times.length && 
                <span className='times__option' onClick={() => setCountOfVisibleTimes(times.length)}>Еще</span>
              }
            </div>
          </div>
        </li>
      </ul>
      <Footer total={total} pier={pier}/>
    </main>
  )
}
