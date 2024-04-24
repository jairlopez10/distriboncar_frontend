import { useNavigate } from "react-router-dom"

const Productoferreteriaj = ({producto, tipocliente}) => {

    const {titulo, precio, imagenes, referencia, bulto, id} = producto
    const navigate = useNavigate()
    let tipoclienteurl = ""

    const titulourl = titulo.replace(/ /g, '-').toLowerCase().replace('#', '-').replace('/', '-').replace('/', '-')

    if(tipocliente === 'Detal'){
      tipoclienteurl = "d"
    } else {
      tipoclienteurl = "m"
    }

  return (
    <>
        <div className="productocard cursor-pointer" onClick={() => window.open(`/${titulourl}/${id}/${tipoclienteurl}`)}>
            <img loading="lazy" src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
            <div>
                <p className="titulocard">{titulo}</p>
                <p className="referencia">{bulto}</p>
                <p className="referencia italic">REF: {producto.referencia ? producto.referencia : "" }</p>
                <p className="referencia italic">{`$${tipocliente === 'Detal' ? (Math.ceil(precio*1.332/100)*100).toLocaleString('es-CO') : precio.toLocaleString('es-CO')}`}</p>
                
            </div>
            
        </div>
    </>
  )
}

export default Productoferreteriaj