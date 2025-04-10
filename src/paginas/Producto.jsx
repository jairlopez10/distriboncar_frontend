import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import ferreteriajairdb from "../components/ferreteriajairdb";
import Multimedia from "../components/Multimedia";
import usePagina from "../hooks/usePagina";
import Juegorachetgrand from "../components/productsection/Juegorachetgrand";
import Rachetadaptadores from "../components/productsection/Rachetadaptadores";
import Encendedorrecargable from "../components/productsection/Encendedorrecargable";

const Producto = () => {

    const params = useParams();
    const idurl = +params.id
    const tipocliente = params.tipocliente
    const navegar = useNavigate()
    const producto = ferreteriajairdb.find(prod => prod.id === idurl)
    const { titulo, id, imagenes } = producto
    const [alertacarrito, setAlertaCarrito] = useState(false);
    const [multiactual, setmultiactual] = useState(imagenes[0])
    const [cantidad, setCantidad] = useState(1);
    const [descripcion, setdescripcion] = useState(true);
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritodistribucionesboncar')) || []);
    const [prodsectionboolean, setProdsectionboolean] = useState(false);
    const [visiblecomprar, setVisiblecomprar] = useState(true);
    const botoncomprarref = useRef(null); //Referencia el boton
    const productsection = {
      140: <Juegorachetgrand />,
      271: <Rachetadaptadores />,
      272: <Encendedorrecargable />
    }
    
    const { setPagina } = usePagina();

   //Actualizar carrito en localstorage
   useEffect(() => {
  
    localStorage.setItem('carritodistribucionesboncar', JSON.stringify(carrito))

  }, [carrito]) 

  useEffect(() => {
    window.scrollTo(0,0);
    document.title = `DB - ${titulo}`
    setPagina('Jair')

    if(productsection[producto.id]) {
      setProdsectionboolean(true)
    }

    const observer = new IntersectionObserver( entries => {
      if(entries[0].isIntersecting){
        setVisiblecomprar(true)
      } else {
        setVisiblecomprar(false)
      }
    })
  
    if(botoncomprarref.current){
      observer.observe(botoncomprarref.current)
    }

    return () => {
      if(botoncomprarref.current) {
        observer.unobserve(botoncomprarref.current);
      }
    }

  }, [])

  const cambiarcantidad = (tipo) => {

    if(tipo === 'menos'){
      if(cantidad > 1){
        setCantidad(cantidad-1);
      } else {
        setCantidad(1);
      }
    } else {
      if(cantidad<=0){
        setCantidad(1)
      } else {
        setCantidad(cantidad+1);
      }
    }
  }

  const agregaralcarrito = () => {

    const preciotipocliente = producto.precio

    const pedido = {
      id: producto.id,
      nombre: producto.titulo,
      cantidad: +cantidad,
      precio: preciotipocliente,
      imagen: producto.imagenes[0].url
    }

    //Evento de Google Analytics
    gtag('event', 'add_to_cart', {
      currency: 'COP',
      items: [{
        item_id: producto.id,
        item_name: producto.titulo,
        quantity: cantidad,
        price: producto.precio
      }]
    })

    //Enviar evento al Pixel de Facebook
    fbq('track', 'AddToCart', {
      content_ids: producto.id,
      content_name: producto.titulo,
      currency: 'COP',
      value: producto.precio * cantidad
    });

    let nuevocarrito = []

    const existe = carrito.some(item => item.id === producto.id);

    if(existe){
      nuevocarrito = carrito.map(item => {
        if(item.id === producto.id){
          item.cantidad = +item.cantidad + +cantidad;
          return item;
        } else {
          return item;
        }
      })
    } else {
      nuevocarrito = [...carrito, pedido]
    }

    //fbq('track', 'AddToCart');
    
    setCarrito(nuevocarrito);

    //notificacioncarrito()
    setTimeout(() => {
      navegar('/checkout')
    }, 200);
  }

  const notificacioncarrito = () => {
    setAlertaCarrito(true);
    setTimeout(() => {
      setAlertaCarrito(false);
    }, 3000);
  }



  return (
    <>
      <div className="contenedor2 separaheader">
        <div className={`${alertacarrito ? 'block' : 'hidden'} notificacion-carrito`}>
          Agregado Correctamente
        </div>
        <div className="imagen-titulos">
          <div className="imagen-carousel">
            {multiactual.tipo === 'imagen' ? (
              <>
                <img src={multiactual.url} alt="" className="imagen-principal-producto" />
              </>
            ) : (
              <>
                <video className="imagen-principal-producto" autoPlay loop controls controlsList="nodownload">
                  <source src={multiactual.url} />
                </video>
              </>
            )}
            <div className="carousel">
              {producto.imagenes.map(multimedia => (
                <Multimedia 
                  key={multimedia.url} 
                  multimedia={multimedia}
                  setmultiactual={setmultiactual}
                />
              ))}
            </div>
          </div>
          <div className="contenido-producto-final">
            <p className="titulo-producto-final">{producto.titulo}</p>
            <div className="flex gap-1 items-center">
              <img src="/estrella.webp" alt="estrella" className="estrella"/>
              <img src="/estrella.webp" alt="estrella" className="estrella"/>
              <img src="/estrella.webp" alt="estrella" className="estrella"/>
              <img src="/estrella.webp" alt="estrella" className="estrella"/>
              <img src="/estrella.webp" alt="estrella" className="estrella"/>
              <p> + {producto.id + 25} Vendidos</p>
            </div>
            <p className="precio-prod-antes">{`$${(producto.precio * 2).toLocaleString('es-CO')}`}</p>
            <div className="flex items-center gap-3">
              <p className="precio-prod">{`$${producto.precio.toLocaleString('es-CO')}`}</p>
              <p className="oferta-text">50% DESCTO</p>
            </div>
            
            <div className="botones-carrito">
              <button onClick={() => cambiarcantidad('menos')}>-</button>
              <input type="number" min="1" value={cantidad} onChange={e => setCantidad(e.target.value)} />
              <button onClick={() => cambiarcantidad('mas')}>+</button>
            </div>
            <button ref={botoncomprarref} className="boton-agregar-carrito" onClick={() => agregaralcarrito()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icono-carrito-producto icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              Pagar en Casa </button>

            <button className={`${visiblecomprar ? 'hidden' : 'fijar-boton-comprar-ahora boton-agregar-carrito'}`} onClick={() => agregaralcarrito()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icono-carrito-producto icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              Pagar en Casa </button>

            <img src="/puntosfuertes.webp" className="puntosfuertes" alt="puntos fuertes" />
            
            {prodsectionboolean === true ? (
              <>
                {productsection[producto.id]}
              </>
            ) : (
              <> 
                <div className="descripcion-promocion">
                  <div className="descripcion">
                    <div className="boton-descripcion" onClick={() => setdescripcion(!descripcion)}>
                      <p>Caracteristicas</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#3d3d3d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 10l6 6l6 -6h-12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Producto