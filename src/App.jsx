import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/_reset.scss'
import Home from './pages/Home'
import Add from './pages/Add'
import Details from './pages/Details'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/add" element={<Add></Add>} />
          <Route path="/details/:id" element={<Details></Details>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
