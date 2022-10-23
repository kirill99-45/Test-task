import { Header } from './Card/header';
import { Main } from './Card/main';
import { Footer } from './Card/footer';
import { State } from './Store';
import { Table } from './Table/table';
import './Card/card.css';

export const HTML_CSS: React.FC = () => {

  return (
    <>
      <ul className='wrapper'>
        {
          State.map(item => {
            return (
              <li className='card' key={item.id}>
                <Header img={item.img} mark={item.mark}/>
                <Main
                  duration={item.duration}
                  title={item.title}
                  content={item.content}
                  times={item.times}
                  total={item.price.total}
                  pier={item.price.pier}
                />
              </li>
            )
          })
        }
      </ul>
      <Table />
    </>
  )
}
