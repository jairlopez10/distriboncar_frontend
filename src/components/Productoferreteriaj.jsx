import { useNavigate } from "react-router-dom"
import usePagina from "../hooks/usePagina";

const Productoferreteriaj = ({producto, tipocliente}) => {

    const {titulo, precio, imagenes, referencia, bulto, id} = producto
    const navigate = useNavigate()
    const { pagina } = usePagina()
    let tipoclienteurl = pagina

    //Funciones

    const titulourl = titulo.replace(/ /g, '-').toLowerCase().replace('#', '-').replace('/', '-').replace('/', '-')

  return (
    <>
        <div className="productocard cursor-pointer" onClick={() => window.open(`/${titulourl}/${id}/${tipoclienteurl}`)}>
            <img loading="lazy" src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
            <div>
                <p className="titulocard">{titulo}</p>
                <p className="referencia italic">{`$${precio.toLocaleString('es-CO')}`}</p>
                
            </div>
            
        </div>
    </>
  )
}

export default Productoferreteriaj