import { useState, useEffect } from "react"
import jugueterialocaldb from "../components/jugueterialocaldb";
import Productocard from "../components/Productocard";

const Jugueterialocal = () => {

  const juguetesavailable = jugueterialocaldb.filter(product => {
    if(product.status === "disponible"){
      return product;
    }
  })

  const MIN = 1000;
  const STEP = 5000;
  const MAX = 206000;
  const numproductopag = 10;
  const [juguetesmostrar, setjuguetesmostrar] = useState(juguetesavailable)
  const [juguetesfiltrados, setjuguetesfiltrados] = useState(juguetesavailable)
  const [categoria, setcategoria] = useState("");
  const [ordenar, setordenar] = useState("");
  const [preciomax, setpreciomax] = useState(+MAX);

  const filtrarcategoria = (product) => {
    if (categoria === "") return product;
    if(categoria === product.categoria) {
      return product;
    }
  }

  const filtrarpreciomax = (product) => {
    if(product.precio <= preciomax) return product;
  }

  //Filtra los productos
  useEffect(() => {
    let newlist = juguetesavailable.filter(filtrarcategoria).filter(filtrarpreciomax)
    
    if(ordenar !== "") {
      if(ordenar === "asc") {
        newlist.sort((a,b) => a.precio - b.precio)
      } else {
        newlist.sort((a,b) => b.precio - a.precio)
      }
    }

    setjuguetesfiltrados(newlist);

  }, [categoria, ordenar, preciomax])

  /*
  //Definir los paginadores y filtrar productos
  useEffect(() => {
    
    let iteradormin 
    let iteradormax

  }, [juguetesfiltrados])


  */

  return (
    <>
      <div className="contenedor">
        <h1 className="titulocatalogo">Catalogo</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            <select className="filtro" name="categoria" id="categoria" onChange={e => setcategoria(e.target.value)}>
              <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="dinosaurios">Dinosaurios</option>
              <option value="carros-impulso">Carros de Pila e Impulso</option>
              <option value="carros-control">Carros de Control Remoto</option>
              <option value="didacticos">Didacticos</option>
              <option value="mascotas">Animales y Mascotas</option>
              <option value="munecas">Muñecas & Bebes</option>
              <option value="munecos">Muñecos & Figuras Accion</option>
              <option value="punteria">Punteria</option>
              <option value="maquillaje">Maquillaje y Belleza</option>
              <option value="doctor-cocina">Doctor y Cocina</option>
              <option value="educativo">Interactivo y Educativo</option>
              <option value="peluches">Peluches</option>
              <option value="organetas-guitarras">Organetas & Guitarras</option>
            </select>
            <select name="ordenar" id="ordenar" onChange={e => setordenar(e.target.value)}>
              <option value="">{ordenar === "" ? "Ordenar" : "Mayor Relevancia"}</option>
              <option value="asc">Precio menor a mayor</option>
              <option value="des">Precio mayor a menor</option>
            </select>
            <div className="seccion-precio">
              <p>Rango Precios</p>
              <input type="range" max={MAX} min={MIN} step={STEP} defaultValue={MAX} onChange={e => setpreciomax(+e.target.value)} />
              <div className="text-range-prices">
                <p>{`$${MIN.toLocaleString('es-CO')}`}</p>
                <p>{`$${preciomax.toLocaleString('es-CO')}`}</p>
              </div>
            </div>
          </div>
          <div className="productos">
            {juguetesfiltrados.map(producto => {
              return (
                <Productocard 
                  key={producto.id}
                  producto={producto}
                />
              )
            })}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Jugueterialocal