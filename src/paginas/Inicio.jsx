import { useState, useEffect, useRef } from "react";
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

  const { setPagina, pagina } = usePagina();
  const MIN = 100;
  const STEP = 5000;
  const MAX = 206000;
  const numproductospag = 12;
  const numproductopag = 10;
  const [ferreteriamostrar, setferreteriamostrar] = useState(ferreteriaavailable)
  const [ferreteriafiltrada, setferreteriafiltrada] = useState(ferreteriaavailable)
  const [filtroshide, setFiltroshide] = useState(true);
  const [categoria, setcategoria] = useState("");
  const [ordenar, setordenar] = useState("");
  const [preciomax, setpreciomax] = useState(+MAX);
  const [alerta, setAlerta] = useState({});
  const [numpagina, setnumpagina] = useState(1);
  const [productosmostrar, setproductosmostrar] = useState(ferreteriaavailable);
  const tituloferreteria = document.querySelector('.tituloferreteria')
  const tituloproductosref = useRef(null);
  const navigate = useNavigate()

  const params = useParams()
  const categoriaurl = params.categoria || ""

  const filtrarcategoria = (product) => {
    if (categoria === "") return product;
    if(categoria === product.categoria) {
    return product;
    }
  }

  const definirproductospagina = () => {

    let iteradormax = numpagina * numproductospag;
    let iteradormin = iteradormax - numproductospag;

    //Define si el listado de productos es menor que el iteradormayor definido inicial
    if (ferreteriafiltrada.length <= iteradormax) iteradormax = ferreteriafiltrada.length;

    let nuevolistado = [];

    for (let i=iteradormin; i<iteradormax; i++){
      nuevolistado.push(ferreteriafiltrada[i]);
    }

    setproductosmostrar(nuevolistado);

    definirpaginadores();

  }

  const definirpaginadores = () => {

    const numpaginadores = Math.ceil(ferreteriafiltrada.length / numproductospag);
    
    let arraypaginas = []

    for(let i=1; i<=numpaginadores; i++){
      arraypaginas.push(i);
    }

    return arraypaginas;

  }

  const filtrarpreciomax = (product) => {
      if(product.precio <= preciomax) return product;
  }

  
  useEffect(() => {
    definirproductospagina();

  }, [ferreteriafiltrada, numpagina])
  


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
      setproductosmostrar(newlist);


      if(categoria !== ''){
        gtag('event', `filtrar_${categoria}`)
      }
      
      setnumpagina(1);
      definirproductospagina();

  }, [categoria, ordenar, preciomax])

  useEffect(() => {
    setPagina('Jair')
    document.title = "Distriboncar | Ferreteria"
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <div className="contenedor">
        <div className="div-banner separaheader">
          <img src="./banner.webp" alt="" />
        </div>
        <h1 ref={tituloproductosref} className="titulocatalogo tituloferreteria ">Catalogo</h1>
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
          <div className="">
            <div className="productos">
              {productosmostrar.map(producto => {
                return (
                  <Productoferreteriaj 
                    key={producto.id}
                    producto={producto}
                    pagina={pagina}
                  />
                )
              })}
            </div>
            <div className="divpaginador">
              {definirpaginadores().map(pag => (
                <button key={pag} className={`${pag === 1 ? 'paginador-activo' : ''} paginador`} onClick={(e) => {
                  //Cambiar la pagina
                  setnumpagina(pag);
                  definirproductospagina();

                  //Hacer scroll al inicio de los productos
                  if(tituloproductosref.current){
                    tituloproductosref.current.scrollIntoView({ behavior: 'smooth'})
                  }
                  
                  //Cambiar el color del paginador
                  const paginadores = document.querySelectorAll('.paginador');
                  paginadores.forEach(pagin => pagin.classList.remove('paginador-activo'))
                  e.target.classList.add('paginador-activo');
                  
                }}>{pag}</button>
              ))}
            </div>
          </div>
          
          
        </div>
      </div>
    </>
  )
}

export default Inicio