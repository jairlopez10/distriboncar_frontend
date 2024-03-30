import { useContext } from "react";
import Paginacontext from "../context/PaginaProvider";

const usePagina = () => {
  return useContext(Paginacontext)
}

export default usePagina