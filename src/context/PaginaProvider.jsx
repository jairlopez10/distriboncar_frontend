import { createContext, useState } from "react";

const Paginacontext = createContext()

const PaginaProvider = ({children}) => {

    const [pagina, setPagina] = useState('inicio')

  return (
    <Paginacontext.Provider value={{
        pagina,
        setPagina
    }} >
        {children}
    </Paginacontext.Provider>
  )
}

export {
    PaginaProvider
}

export default Paginacontext