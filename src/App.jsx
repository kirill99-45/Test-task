import { Routes, Route } from 'react-router-dom';
import { Tickets } from './Pages/JS/tickets';
import { HTML_CSS } from './HTML_CSS/page';
import { Home } from './Pages/Home/home';

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/html_css' element={<HTML_CSS/>}/>
      <Route path='/js' element={<Tickets/>}/>
    </Routes>
  )
}
