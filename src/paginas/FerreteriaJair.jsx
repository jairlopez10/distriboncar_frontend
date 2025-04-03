import { useState, useEffect } from "react";
import ferreteriajairdb from "../components/ferreteriajairdb";
import Productoferreteriaj from "../components/Productoferreteriaj";
import usePagina from "../hooks/usePagina";
import Alerta from "../components/Alerta";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FerreteriaJair = () => {

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
      document.title = 'Distribuciones Boncar - Ferreteria'
      window.scrollTo(0,0)
      setcategoria(categoriaurl)

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
        // 121111, //Cliente Ingrid - Se bloque por 5 ingresos en 2 dispositivos
        // 201254, //Cliente Ingrid - Se bloquea por 9 ingresos en 5 dispositivos
        // 343421, //Cliente Ingrid Se bloquea por 28 ingresos en 17 dispositivos
        // 429804, //Cliente Ingrid - Se bloquea por 6 ingresos en 4 dispositivos
        439777, //Cliente Ingrid
        // 750980, //Cliente Ingrid - Se bloquea por 7 ingresos en 3 dispositivos
        129312, //Cliente Ingrid
        // 323232, //Cliente Ingrid - Se bloque por 13 ingresos en 4 dispositivos
        485443, //Cliente Carolina
        123219, //Cliente Carolina
        120010, //Cliente Carolina
        110121, //Cliente Carolina
        200001, //Cliente Carolina
        900101, //Cliente Carolina
        102221, //Cliente Carolina
        666642, //Cliente Carolina - Ingreso 13 veces en 1 solo dispositivo y SI COMPRO
        992221, //Cliente Carolina - Se bloquea por 7 ingresos en 2 dispositivos
        111131, //Cliente Carolina
        323299, //Cliente Carolina
        //201212, //Cliente Ingrid - Se bloquea porque ingreso 5 veces, probablemente se compartio a mas de 1 cliente
        919299, // Cliente Carolina
        100012, // Cliente Carolina
        703232, // Cliente Carolina
        975312, // Cliente Carolina
        232111, // Cliente Carolina
        505021, // Cliente Carolina
        325642, // Cliente Carolina
        120200, // Cliente Carolina
        333302, // Cliente Carolina
        333211, // Cliente Carolina
        444522, // Cliente Carolina
        666732, // Cliente Carolina
        861112, // Cliente Carolina
        831193, // Cliente Carolina
        932221, // Cliente Carolina
        555434, // Cliente Ingrid
        675384, // Cliente Ingrid
        853451, // Cliente Ingrid
        945241, // Cliente Ingrid
        994844, // Cliente Ingrid
        223112, // Cliente Ingrid
        554555, // Cliente Ingrid
        766666, // Cliente Ingrid
        839211, // Cliente Ingrid
        566334, // Cliente Ingrid
        999000, // Cliente Ingrid
        443000, // Cliente Ingrid
        656220, // Cliente Ingrid
        222198, // Cliente Ingrid
        418421 // Cliente Ingrid
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
      <div className="contenedor separaheader">
        <div className={`${auth ? 'hidden' : 'login-auth'}`}>
          <h2>Iniciar Sesion</h2>
          <label htmlFor="loginauth">Contraseña:</label>
          <input id="loginauth" type="number" placeholder="Contraseña" value={pwdauth} onChange={(e) => setPwdauth(e.target.value)}/>
          {alerta.error && <Alerta alerta={alerta} />}
          <button className="boton-auth" onClick={handleauth}>Ingresar</button>
        </div>
        
      </div>
      <div className={`${auth ? 'contenedor' : 'hidden'}`}>
        <h1 className="titulocatalogo tituloferreteria">Catalogo Ferreteria</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            
            
          </div>
          <select className="filtro ferreteria" name="categoria" id="categoria" value={categoria} onChange={e => {
            navigate(`/ferreteriaj/${e.target.value}`)
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

export default FerreteriaJair