import React from 'react'

const Productoferreteria = ({producto}) => {

    const {titulo, precio, imagenes, referencia, bulto} = producto

  return (
    <>
        <div className="productocard">
            <img src={`${imagenes[0].url}`} alt={`imagen ${titulo}`} />
            <div>
                <p className="titulocard">{titulo}</p>
                <p className="bultoclase">{bulto}</p>
                <p className="referencia italic">REF: {producto.referencia ? producto.referencia : "" }</p>
            </div>
            
        </div>
    </>
  )
}

export default Productoferreteria