import { useParams } from "react-router-dom"

const Producto = () => {

    const params = useParams();

    console.log(params.titulo);

  return (
    <div>Producto</div>
  )
}

export default Producto