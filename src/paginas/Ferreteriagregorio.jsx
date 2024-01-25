import { useState, useEffect } from "react"

const Ferreteriagregorio = () => {

    const [auth, setAuth] = useState(false);

  return (
    <>
        <div className={`${auth ? 'hidden' : 'block'}`}>
            <div>
                <label htmlFor="codigo">Codigo Acceso</label>
                <input type="text" />
                <button className="botoningresar">Ingresar</button>
            </div>
            

        </div>
        <div className={`${auth ? 'block' : 'hidden'}`}>
            <h3>Catalogo</h3>
        </div>
    </>
  )
}

export default Ferreteriagregorio