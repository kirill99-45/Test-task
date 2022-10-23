import { Outlet } from 'react-router-dom';
import { Header } from './../Header/header';
import { Footer } from './../Footer/footer';
import './layout.css';

export const Layout: React.FC = () => {
  return (
    <div className='app__wrapper'>
      <Header />
      <div className='app__container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
