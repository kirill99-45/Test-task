import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { IPrice } from './../Store';

export const Footer: React.FC<IPrice> = ({ total, pier }) => {

  return (
    <footer className='card__footer footer'>
      <div className='footer__price price'>
        <div className='price__wrapper'>
          <span className='price__total'>{total}</span>
          <FontAwesomeIcon icon={faRubleSign} className='price__ruble'/>
        </div>
        <span className='price__pier'>{pier} р на причале</span>
      </div>
      <button type='button' className='card__button'>Подробнее</button>
    </footer>
  )
}
