import { useState, useEffect } from "react"
import jugueterialocaldb from "../components/jugueterialocaldb";
import Productocardprecio from "../components/Productocardprecio";
import Alerta from "../components/Alerta";
import usePagina from "../hooks/usePagina";

const Jugueterialocalprecios = () => {

  const juguetesavailable = jugueterialocaldb.filter(product => {
    if(product.status === "disponible"){
      return product;
    }
  })

  const MIN = 1000;
  const STEP = 5000;
  const MAX = 300000;
  const numproductopag = 10;
  const [juguetesmostrar, setjuguetesmostrar] = useState(juguetesavailable)
  const [juguetesfiltrados, setjuguetesfiltrados] = useState(juguetesavailable)
  const [categoria, setcategoria] = useState("");
  const [ordenar, setordenar] = useState("");
  const [preciomax, setpreciomax] = useState(+MAX);
  const [auth, setAuth] = useState(false);
  const [pwdauth, setPwdauth] = useState('');
  const [alerta, setAlerta] = useState({});
  const { setPagina } = usePagina();
  const [tipocliente, setTipocliente] = useState('');

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

  useEffect(() => {
    setPagina('Jair')
    document.title = 'Distribuciones Boncar - Juguetes'
    window.scrollTo(0,0)

    //Revisar auth
    const datestorage = JSON.parse(localStorage.getItem('authdistribucionesboncar')) || {}

    if(datestorage.dia){
      const today = new Date()
      if(today.getFullYear() === datestorage.ano && today.getMonth() === datestorage.mes && today.getDate() === datestorage.dia){
        setAuth(true);
        if(datestorage.tipocliente === 'Detal'){
          setTipocliente('Detal')
        } else {
          setTipocliente('Mayorista')
        }
      }
    }
  }, [])

  const handleauth = () => {
    const pwdauths = [
      202410, //Detal
      101010, //Mayorista Jair
      141414, //Detal Jair
      201212,
      121111,
      201254,
      343421,
      429804,
      439777,
      750980,
      129312,
      323232,
      485443,
    ]

    let tipoclienttemp = '';
    const result = pwdauths.some(pwd => pwd === +pwdauth)
    
    if(result) {

      if(pwdauth === "202410" || pwdauth === '141414'){
        tipoclienttemp = 'Detal'
        setTipocliente('Detal')
      } else {
        tipoclienttemp = 'Mayorista'
        setTipocliente('Mayorista')
      }
      setAuth(true)

      gtag('event', `login_${pwdauth}`, {
        method: pwdauth
      })

      //Crear token
      const date = new Date()
  
      const newdate = {
        ano: date.getFullYear(),
        dia: date.getDate(),
        mes: date.getMonth(),
        tipocliente: tipoclienttemp
      }

      localStorage.setItem('authdistribucionesboncar', JSON.stringify(newdate))
    } else {
      setAlerta({
        error: true,
        msg: 'Contraseña Incorrecta'
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }

  }

  return (
    <>
      <div className="contenedor">
        <div className={`${auth ? 'hidden' : 'hidden'}`}>
          {/*
            En vez del doble hidden va "login-auth" para que pida la contraseña
          */}
          <h2>Iniciar Sesion</h2>
          <label htmlFor="loginauth">Contraseña:</label>
          <input id="loginauth" type="number" placeholder="Contraseña" value={pwdauth} onChange={(e) => setPwdauth(e.target.value)}/>
          {alerta.error && <Alerta alerta={alerta} />}
          <button className="boton-auth" onClick={handleauth}>Ingresar</button>
        </div>
        
      </div>
      <div className={`${auth ? 'contenedor' : 'contenedor'}`}>
        {/* 
          En vez de conteneder en alguna va es "hidden" para que desaparezca el contenido cuando no tiene la contraseña
        */}
        <h1 className="titulocatalogo titulojugueteria">Catalogo</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            <select className="filtro juguetes" name="categoria" id="categoria" onChange={e => setcategoria(e.target.value)}>
              <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="dinosaurios">Dinosaurios</option>
              <option value="carros-impulso">Carros y Motos de Impulso</option>
              <option value="carros-pila">Carros y Helicopteros de Pila</option>
              <option value="carros-control">Carros de Control Remoto</option>
              <option value="didacticos">Didacticos</option>
              <option value="mascotas">Animales y Mascotas</option>
              <option value="munecas">Muñecas & Bebes</option>
              <option value="munecos">Muñecos & Figuras Accion</option>
              <option value="punteria">Punteria</option>
              <option value="maquillaje">Maquillaje y Belleza</option>
              <option value="doctor-cocina">Doctor y Cocina</option>
              <option value="educativo">Interactivo y Educativo</option>
              <option value="legos">Legos y Pistas</option>
              <option value="peluches">Peluches</option>
              <option value="organetas-guitarras">Organetas & Guitarras</option>
              <option value="musical">Musical</option>
            </select>
            <select name="ordenar" id="ordenar" className="filtro juguetes" onChange={e => setordenar(e.target.value)}>
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
                <Productocardprecio
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

export default Jugueterialocalprecios