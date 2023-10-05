import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Jugueterialocal from './paginas/Jugueterialocal'
import Jugueteriabodega from './paginas/Jugueteriabodega'
import Ferreteriabodega from './paginas/Ferreteriabodega'
import Ferreterialocal from './paginas/Ferreterialocal'
import Inicio from './paginas/Inicio'
import Producto from './paginas/Producto'
import Nosotros from './paginas/Nosotros'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Inicio />}/>
            <Route path='catalogojuguetesl' element={<Jugueterialocal />}/>
            <Route path='catalogojuguetesb' element={<Jugueteriabodega />}/>
            <Route path='catalogoferreteriab' element={<Ferreteriabodega />}/>
            <Route path='catalogoferreterial' element={<Ferreterialocal />}/>
            <Route path='/:titulo' element={<Producto />}/>
            <Route path='nosotros' element={<Nosotros />}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
