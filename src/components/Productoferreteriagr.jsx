import { useNavigate } from "react-router-dom"
import usePagina from "../hooks/usePagina"

const Productoferreteriagr = ({producto}) => {
    
    const {titulo, precio, imagenes, referencia, bulto, id} = producto
    const navigate = useNavigate()
    const { pagina } = usePagina()
    let tipoclienteurl = pagina
  
    //Funciones
    // Este era el primer div para que abriera la pagina del producto <div className="productocard cursor-pointer" onClick={() => window.open(`/${titulourl}/${id}/${tipoclienteurl}`)}>
  
    const titulourl = titulo.replace(/ /g, '-').toLowerCase().replace('#', '-').replace('/', '-').replace('/', '-')
  
    return (
      <>
          <div className="productocard cursor-pointer">
              <img loading="lazy" src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
              <div>
                  <p className="titulocard">{titulo}</p>
                    <p className="precio-car italic">{`$${precio.toLocaleString('es-CO')}`}</p>
                  <p className="bultoclase">{bulto}</p>
                  <p className="referencia italic">REF: {producto.referencia ? producto.referencia : "" }</p>
                 
                  
              </div>
              
          </div>
      </>
    )
}

export default Productoferreteriagr