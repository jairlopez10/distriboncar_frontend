import { useState, useEffect } from "react";
import ferreteriamerybd from "../components/ferreteriamerybd";
import Productocard from "../components/Productocard";
import Productoferreteria from "../components/Productoferreteria";

const FerrreteriaMery = () => {

    const ferreteriaavailable = ferreteriamerybd.filter(product => {
        if(product.status === "disponible"){
        return product;
        }
    })
    
    const MIN = 100;
    const STEP = 5000;
    const MAX = 206000;
    const numproductopag = 10;
    const [ferreteriamostrar, setferreteriamostrar] = useState(ferreteriaavailable)
    const [ferreteriafiltrada, setferreteriafiltrada] = useState(ferreteriaavailable)
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
        let newlist = ferreteriaavailable.filter(filtrarcategoria).filter(filtrarpreciomax)
        
        if(ordenar !== "") {
        if(ordenar === "asc") {
            newlist.sort((a,b) => a.precio - b.precio)
        } else {
            newlist.sort((a,b) => b.precio - a.precio)
        }
        }
    
        setferreteriafiltrada(newlist);
    
    }, [categoria, ordenar, preciomax])
    
    console.log(ferreteriafiltrada.length)

  return (
    <>
      <div className="contenedor">
        <h1 className="titulocatalogo tituloferreteria">Catalogo Ferreteria</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            <select className="filtro ferreteria" name="categoria" id="categoria" onChange={e => setcategoria(e.target.value)}>
              <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="candados">Candados</option>
              <option value="guayas">Guayas</option>
              <option value="rachet">Rachet</option>
              <option value="espatulas">Espatulas</option>
              <option value="prensas">Prensas</option>
              <option value="tijeras">Tijeras</option>
              <option value="metros">Metros y Decametros</option>
              <option value="llaves">Llaves</option>
              <option value="hombresolos">Hombre Solos</option>
              <option value="seguetas">Marco Seguetas</option>
              <option value="gatos">Gatos</option>
              <option value="gratas">Gratas y Cepillos</option>
              <option value="copasierra">Copa Sierra</option>
              <option value="tenazas">Tenazas</option>
              <option value="kitdespinchar">Kit Despinchar</option>
              <option value="otros">Otros</option>
            </select>
            
          </div>
          <div className="productos">
            {ferreteriafiltrada.map(producto => {
              return (
                <Productoferreteria 
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

export default FerrreteriaMery