import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Jugueterialocal from './paginas/Jugueterialocal'
import Jugueterialocalprecios from './paginas/Jugueterialocalprecios'
import Inicio from './paginas/Inicio'
import Producto from './paginas/Producto'
import Nosotros from './paginas/Nosotros'
import Ferreteriagregorio from './paginas/Ferreteriagregorio'
import FerrreteriaIvan from './paginas/FerrreteriaIvan'
import FerrreteriaMery from './paginas/FerreteriaMery'
import FerreteriaJair from './paginas/FerreteriaJair'
import JugueteriaBodega from './paginas/JugueteriaBodega'
import Checkout from './paginas/Checkout'
import { PaginaProvider } from './context/PaginaProvider'
import Pedidoconfirmado from './paginas/Pedidoconfirmado'
import CatalogoIvan from './paginas/CatalogoIvan'
import CatalogoMery from './paginas/CatalogoMery'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <PaginaProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Inicio />}/>
              <Route path='/:categoria' element={<Inicio />}/>
              <Route path='ferreteriaiv' element={<FerrreteriaIvan />}/>
              <Route path='ferreteriaiv/:categoria' element={<FerrreteriaIvan />}/>
              <Route path='ferreteriaivc' element={<CatalogoIvan />}/>
              <Route path='ferreteriaivc/:categoria' element={<CatalogoIvan />}/>
              <Route path='catalogojuguetesl' element={<Jugueterialocal />}/>
              <Route path='catalogojugueteslp' element={<Jugueterialocalprecios />}/>
              <Route path='ferreteriagr' element={<Ferreteriagregorio />}/>
              <Route path='ferreteriagr/:categoria' element={<Ferreteriagregorio />}/>
              <Route path='ferreteriame' element={<FerrreteriaMery />}/>
              <Route path='ferreteriame/:categoria' element={<FerrreteriaMery />}/>
              <Route path='ferreteriamec' element={<CatalogoMery />}/>
              <Route path='ferreteriaj' element={<FerreteriaJair />}/>
              <Route path='ferreteriaj/:categoria' element={<FerreteriaJair />}/>
              <Route path='/:titulo/:id/:tipocliente' element={<Producto />}/>
              <Route path='jugueteriabodega' element={<JugueteriaBodega />}/>
              <Route path='nosotros' element={<Nosotros />}/>
              <Route path='checkout' element={<Checkout />} />
              <Route path='pedidoconfirmado' element={<Pedidoconfirmado />} />
              
            </Route> 
          </Routes>
        </PaginaProvider>
      </BrowserRouter>
    </>
  )
}

export default App
