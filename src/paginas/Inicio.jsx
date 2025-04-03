import { useState, useEffect } from "react";
import ferreteriajairdb from "../components/ferreteriajairdb";
import Productoferreteriaj from "../components/Productoferreteriaj";
import usePagina from "../hooks/usePagina";
import Alerta from "../components/Alerta";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Inicio = () => {

  const ferreteriaavailable = ferreteriajairdb.filter(product => {
    if(product.status === "disponible"){
    return product;
    }
  })

  const { setPagina } = usePagina();
  const MIN = 100;
  const STEP = 5000;
  const MAX = 206000;
  const numproductopag = 10;
  const [ferreteriamostrar, setferreteriamostrar] = useState(ferreteriaavailable)
  const [ferreteriafiltrada, setferreteriafiltrada] = useState(ferreteriaavailable)
  const [filtroshide, setFiltroshide] = useState(true);
  const [categoria, setcategoria] = useState("");
  const [ordenar, setordenar] = useState("");
  const [preciomax, setpreciomax] = useState(+MAX);
  const [auth, setAuth] = useState(false);
  const [pwdauth, setPwdauth] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tipocliente, setTipocliente] = useState('');
  const navigate = useNavigate()

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

      if(categoria !== ''){
        gtag('event', `filtrar_${categoria}`)
      }
      
      

  }, [categoria, ordenar, preciomax])

  useEffect(() => {
    setPagina('Jair')
    document.title = "Distriboncar | Ferreteria"
  }, [])

  return (
    <>
      <div className="contenedor">
        <h1 className="titulocatalogo tituloferreteria separaheader">Catalogo</h1>
        <div className="seccionjuguetes">
          <div className={`boton-seccion-filtros`} onClick={() => setFiltroshide(!filtroshide)}>
            <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-adjustments-horizontal" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3d3d3d" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 6l8 0" />
              <path d="M16 6l4 0" />
              <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 12l2 0" />
              <path d="M10 12l10 0" />
              <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 18l11 0" />
              <path d="M19 18l1 0" />
            </svg>
            <p className="texto-boton-seccion-filtros">Filtrar y Ordenar</p>
          </div>
          <div className={`${filtroshide ? 'hidden' : 'seccion-filtros'}`}>
              <select className="filtro ferreteria" name="categoria" id="categoria" value={categoria} onChange={e => {
              navigate(`/${e.target.value}`)
              setcategoria(e.target.value)
            }}>
                <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
                <option value="alicates">Alicates, Cortafrio, Pinzas, Tenazas</option>
                <option value="brocas">Brocas</option>
                <option value="candados">Candados</option>
                <option value="calculadoras">Calculadoras & Relojes</option>
                <option value="copasierra">Copa Sierra</option>
                <option value="crucetas">Crucetas & Tricetas</option>
                <option value="cintas">Cintas</option>
                <option value="destornillador">Destornilladores</option>
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
              <select name="ordenar" id="ordenar" className="filtro ferreteria" onChange={e => setordenar(e.target.value)}>
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
            {ferreteriafiltrada.map(producto => {
              return (
                <Productoferreteriaj 
                  key={producto.id}
                  producto={producto}
                  tipocliente={tipocliente}
                />
              )
            })}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Inicio