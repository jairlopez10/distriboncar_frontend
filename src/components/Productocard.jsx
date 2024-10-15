
const Productocard = ({producto}) => {

    const {titulo, precio, imagenes} = producto

  return (
    <>
        <div className="productocard">
            <img src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
            <div>
                <p className="titulocard">{titulo}</p>
                <p className="referencia italic">REF: {producto.referencia ? producto.referencia : "" }</p>
                {/*
                  <p className="preciocard">{`$${precio.toLocaleString('es-CO')}`}</p>
                */}
                
            </div>
            
        </div>
    </>
  )
}

export default Productocard