import { useState, useEffect } from "react";
import ferreteriamerybd from "../components/ferreteriamerybd";
import Productoferreteria from "../components/Productoferreteria";
import usePagina from "../hooks/usePagina";
import { useNavigate, useParams } from "react-router-dom";

const FerrreteriaMery = () => {

    const ferreteriaavailable = ferreteriamerybd.filter(product => {
        if(product.status === "disponible"){
        return product;
        }
    })
    
    const navegar = useNavigate()
    const MIN = 100;
    const STEP = 5000;
    const MAX = 206000;
    const numproductopag = 10;
    const [ferreteriamostrar, setferreteriamostrar] = useState(ferreteriaavailable)
    const [ferreteriafiltrada, setferreteriafiltrada] = useState(ferreteriaavailable)
    const [categoria, setcategoria] = useState("");
    const [ordenar, setordenar] = useState("");
    const [preciomax, setpreciomax] = useState(+MAX);
    const { setPagina } = usePagina()

    const params = useParams()
    const categoriaurl = params.categoria || ""
    
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

        const filtro = document.querySelector('.tituloferreteria')
        filtro.scrollIntoView({
          behavior: 'smooth'
        })
        
    
    }, [categoria, ordenar, preciomax])

    useEffect(() => {
      setPagina('Mery')
    }, [])
    
    console.log(ferreteriafiltrada.length)

  return (
    <>
      <div className="contenedor">
        <h1 className="titulocatalogo tituloferreteria separaheader">Catalogo Ferreteria</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            
            
          </div>
          <select className="filtro ferreteria" name="categoria" id="categoria" value={categoria} onChange={e => {
            navegar(`/ferreteriame/${e.target.value}`)
            setcategoria(e.target.value)
          }}>
          <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="alicates">Alicates y Tenazas</option>
              <option value="brocas">Brocas</option>
              <option value="candados">Candados</option>
              <option value="copasierra">Copa Sierra</option>
              <option value="cintas">Cintas</option>
              <option value="duchas">Duchas</option>
              <option value="espatulas">Espatulas</option>
              <option value="electricos">Electricos & Accesorios</option>
              <option value="gatos">Gatos</option>
              <option value="gratas">Gratas y Cepillos</option>
              <option value="guayas">Guayas</option>
              <option value="hombresolos">Hombre Solos</option>
              <option value="kitdespinchar">Kit Despinchar</option>
              <option value="llaves">Llaves</option>
              <option value="mangueras">Mangueras & Sifones</option>
              <option value="metros">Metros y Decametros</option>
              <option value="pegantes">Pegantes</option>
              <option value="prensas">Prensas</option>
              <option value="rachet">Rachet</option>
              <option value="remachadoras">Remachadoras</option>
              <option value="seguetas">Marco Seguetas</option>
              <option value="tijeras">Tijeras</option>
              <option value="otros">Otros</option>
            </select>
          <div className="productos">
            {ferreteriafiltrada.map(producto => {
              return (
                <Productoferreteria 
                  key={producto.id}
                  producto={producto}
                  tipocliente='Mayorista'
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