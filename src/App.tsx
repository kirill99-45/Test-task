import { Routes, Route } from 'react-router-dom';
import { Tickets } from './Components/Pages/JS/tickets';
import { HTML_CSS } from './Components/Pages/HTML_CSS/page';
import { Home } from './Components/Pages/Home/home';
import { Layout } from './Components/Layout/layout'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path='Test-task' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='html_css' element={<HTML_CSS />}/>
        <Route path='js' element={<Tickets />}/>
      </Route>
    </Routes>
  )
}
