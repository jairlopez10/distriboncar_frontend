import { useNavigate } from "react-router-dom"

const Productoferreteriaj = ({producto}) => {

    const {titulo, precio, imagenes, referencia, bulto, id} = producto
    const navigate = useNavigate()

    const titulourl = titulo.replace(/ /g, '-').toLowerCase().replace('#', '-').replace('/', '-').replace('/', '-')

  return (
    <>
        <div className="productocard cursor-pointer" onClick={() => window.open(`/${titulourl}/${id}`)}>
            <img loading="lazy" src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
            <div>
                <p className="titulocard">{titulo}</p>
                <p className="referencia">{bulto}</p>
                <p className="referencia italic">REF: {producto.referencia ? producto.referencia : "" }</p>
                <p className="referencia italic">{`$${precio.toLocaleString('es-CO')}`}</p>
                
            </div>
            
        </div>
    </>
  )
}

export default Productoferreteriaj