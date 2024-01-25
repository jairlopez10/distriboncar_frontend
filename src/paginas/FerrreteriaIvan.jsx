import { useState, useEffect } from "react";
import ferreteriaivan from "../components/ferreteriaivan";
import Productocard from "../components/Productocard";
import Productoferreteria from "../components/Productoferreteria";

const FerrreteriaIvan = () => {

    const ferreteriaavailable = ferreteriaivan.filter(product => {
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
              <option value="alicates">Alicates</option>
              <option value="amarres">Amarres</option>
              
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

export default FerrreteriaIvan