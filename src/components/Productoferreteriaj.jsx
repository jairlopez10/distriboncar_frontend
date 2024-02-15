
const Productoferreteriaj = ({producto}) => {

    const {titulo, precio, imagenes, referencia, bulto} = producto

  return (
    <>
        <div className="productocard">
            <img src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
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