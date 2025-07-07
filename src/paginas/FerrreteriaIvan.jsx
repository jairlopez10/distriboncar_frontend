import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ferreteriaivan from "../components/ferreteriaivan";
import Productocard from "../components/Productocard";
import usePagina from "../hooks/usePagina";
import Productoferreteria from "../components/Productoferreteria";
import Alerta from "../components/Alerta";


const FerrreteriaIvan = () => {

    const ferreteriaavailable = ferreteriaivan.filter(product => {
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
      setPagina('Ivan')
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
        101010, //Mayorista Ivan
        141414, //Detal Jair
        
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
      
      <div className='contenedor separaheader'>
        <h1 className="titulocatalogo tituloferreteria">Catalogo Ferreteria</h1>
        <div className="seccionjuguetes">
          <div className="seccion-filtros">
            
            
          </div>
          <select className="filtro ferreteria" name="categoria" id="categoria" value={categoria} onChange={e => {
            navigate(`/ferreteriaiv/${e.target.value}`)
            setcategoria(e.target.value)
          }}>
              <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="alicates">Alicates, Cortafrio, Pinzas, Tenazas</option>
              <option value="brocas">Brocas</option>
              <option value="candados">Candados</option>
              <option value="calculadoras">Calculadoras & Relojes</option>
              <option value="copasierra">Copa Sierra</option>
              <option value="crucetas">Crucetas & Tricetas</option>
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
                <Productoferreteria 
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

export default FerrreteriaIvan