import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Jugueterialocal from './paginas/Jugueterialocal'
import Inicio from './paginas/Inicio'
import Producto from './paginas/Producto'
import Nosotros from './paginas/Nosotros'
import Ferreteriagregorio from './paginas/Ferreteriagregorio'
import FerrreteriaIvan from './paginas/FerrreteriaIvan'
import FerrreteriaMery from './paginas/FerreteriaMery'
import FerreteriaJair from './paginas/FerreteriaJair'
import Checkout from './paginas/Checkout'
import { PaginaProvider } from './context/PaginaProvider'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <PaginaProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Inicio />}/>
              <Route path='catalogojuguetesl' element={<Jugueterialocal />}/>
              <Route path='ferreteriagr' element={<Ferreteriagregorio />}/>
              <Route path='ferreteriaiv' element={<FerrreteriaIvan />}/>
              <Route path='ferreteriame' element={<FerrreteriaMery />}/>
              <Route path='ferreteriaj' element={<FerreteriaJair />}/>
              <Route path='/:titulo/:id' element={<Producto />}/>
              <Route path='nosotros' element={<Nosotros />}/>
              <Route path='/checkout' element={<Checkout />} />
            </Route> 
          </Routes>
        </PaginaProvider>
      </BrowserRouter>
    </>
  )
}

export default App
