import { NavLink } from 'react-router-dom';
import './home.css';

export const Home: React.FC = () => {
  return (
    <div className='home'>
      <NavLink to='/html_css' className='home__link'>Верстка</NavLink>
      <NavLink to='/js' className='home__link'>JS</NavLink>
    </div>
  )
}
