import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Jugueterialocal from './paginas/Jugueterialocal'
import Ferreterialocal from './paginas/Ferreterialocal'
import Inicio from './paginas/Inicio'
import Producto from './paginas/Producto'
import Nosotros from './paginas/Nosotros'
import Pedido from './paginas/Pedido'
import Ferreteriagregorio from './paginas/Ferreteriagregorio'
import FerrreteriaIvan from './paginas/FerrreteriaIvan'
import FerrreteriaMery from './paginas/FerreteriaMery'
import FerreteriaJair from './paginas/FerreteriaJair'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Inicio />}/>
            <Route path='catalogojuguetesl' element={<Jugueterialocal />}/>
            <Route path='catalogoferreterial' element={<Ferreterialocal />}/>
            <Route path='ferreteriagr' element={<Ferreteriagregorio />}/>
            <Route path='ferreteriaiv' element={<FerrreteriaIvan />}/>
            <Route path='ferreteriame' element={<FerrreteriaMery />}/>
            <Route path='ferreteriajm' element={<FerreteriaJair />}/>
            <Route path='/:titulo' element={<Producto />}/>
            <Route path='nosotros' element={<Nosotros />}/>
            <Route path='pedido' element={<Pedido />}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
