import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  pier : number,
}

export const Main: React.FC<IMainProps> = ({ duration, title, content, times, total, pier }) => {

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
        <li className='card__content-item '>
          <FontAwesomeIcon icon={faCheck} className='card__check'/>
          <div className='card__times times'>
            <span className='card__description'>Ближайшие рейсы</span>
            <div className='times__options'>
              <Times times={times}/>
            </div>
          </div>
        </li>
      </ul>
      <Footer total={total} pier={pier}/>
    </main>
  )
}
