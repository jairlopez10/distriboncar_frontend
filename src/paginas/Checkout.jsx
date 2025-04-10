import { useEffect, useState } from "react";
import usePagina from "../hooks/usePagina";
import { useNavigate } from "react-router-dom";
import ferreteriajairdb from "../components/ferreteriajairdb";
import Itemcheckout from "../components/Itemcheckout";
import Alerta from "../components/Alerta";
import axios from 'axios'

const Checkout = () => {

    const { setPagina } = usePagina();
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [origen, setOrigen] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [alerta, setAlerta] = useState({});
    const [total, setTotal] = useState(0);
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritodistribucionesboncar')) || []);
    const [carritomostrar, setCarritoMostrar] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [tipocliente, setTipocliente] = useState('');
    const navegar = useNavigate()


    useEffect(() => {
        //Verifica que los productos que estaban en el carrito sigan disponibles
        const carritotemporal = carrito.map(item => {
            if(ferreteriajairdb.some(produ => produ.id === item.id && produ.status === 'disponible')){
                return item;
            }
        })

        setCarritoMostrar(carritotemporal);
    }, [carrito])

    useEffect(() => {
        //Calcular total a pagar
        let totalcarrito = 0;
        carritomostrar.forEach(item => {
            totalcarrito+=(item.cantidad*item.precio)
        })
        setTotal(totalcarrito);

        localStorage.setItem('carritodistribucionesboncar', JSON.stringify(carritomostrar));


    }, [carritomostrar])

    useEffect(() => {
        setPagina('Jair')
        document.title = 'Distriboncar | Checkout'
        window.scrollTo(0,0)

        
        const datestorage = JSON.parse(localStorage.getItem('authdistribucionesboncar')) || {}

        if(datestorage.mes){
            
            if(datestorage.tipocliente === 'Mayorista'){
                setTipocliente('Mayorista')
            } else {
                setTipocliente('Detal')
            }
        }

        //Envia evento de inicio de checkout a Meta
        fbq('track', 'InitiateCheckout', {
            contents: carritomostrar,
            currency: 'COP',
            value: total
        })


    }, [])

    const handlesubmit = async (e) => {
        e.preventDefault();

        setSpinner(true);

        //Revisar si algun campo esta vacio y generar alerta
        if([nombres, telefono, cedula, origen, ciudad, direccion].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setSpinner(false);
            
            setTimeout(() => {
                setAlerta({});
            }, 3500);
            

            return;

        }

        let productostext = ""
        carritomostrar.forEach(item => productostext+=item.cantidad + ' - ' + item.nombre+" || ")
        

        //Crear el pedido

        const fechahoy = new Date();
        const fecha = (fechahoy.getMonth()+1)+"/"+fechahoy.getDate()+"/"+fechahoy.getFullYear()

        const pedido = {
            cliente: nombres,
            origen,
            fecha,
            cedula,
            productos: carritomostrar,
            productostext,
            ciudad,
            direccion,
            telefono,
            total
        }

        //Enviar evento de compra al Pixel de Facebook
        fbq('track', 'Purchase', {
            currency: "COP",
            value: total
        })

        //Enviar evento de compra a Google
        gtag('event', 'purchase', {
            value: total,
            currency: 'COP',
            items: carritomostrar
        })

        //Crear texto URL
        /*
        const texto1wa = `Hola Jair! Te comparto mi pedido a nombre de ${nombres}`
        const texto1url = convertirtextoaurlwa(texto1wa);
        let pedidourlcarrito = carritomostrar.map(item => {
            const texto = `${item.cantidad} - ${item.nombre}`
            return convertirtextoaurlwa(texto)
        })
        let pedidourltext = ''
        pedidourlcarrito.forEach(item => {
            pedidourltext = pedidourltext + item.replace('#','Num') + '%2C%0D'
        })
        */

        //Enviar pedido
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`
            await axios.post(url, pedido);
            setSpinner(false)
            navegar('/pedidoconfirmado')
            localStorage.setItem('carritodistribucionesboncar', JSON.stringify([]))
            setCarrito([]);
            setCarritoMostrar([]);
            
        } catch (error) {
            console.log(error);
        }

    }

    const convertirtextoaurlwa = (texto) => {
        return texto.replace(/ /g, "%20")
    }

  return (
    <>
        <div className="contenedor-checkout separaheader">
            <div className="pagina-checkout">
                <div className="informacion-envio grid-item">
                    <h1 className="text-black">Dirección de Envio</h1>
                    <div className="formulario-datos">
                        <div className="div-rows-info">
                            <div className="div-row-info">
                                <label htmlFor="nombres">Nombres Y Apellidos:</label>
                                <input type="text" placeholder="Carlos Rodriguez Perez" id="nombres" value={nombres} onChange={e => setNombres(e.target.value)} />
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="telefono">Telefono:</label>
                                <input type="tel" placeholder="Telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                            </div>
                            <div className="div-row-info">
                                <label htmlFor="cedula">Cedula:</label>
                                <input type="text" placeholder="79744931" id="cedula" value={cedula} onChange={e => setCedula(e.target.value)}/>
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="ciudad">Ciudad/Departamento:</label>
                                <input type="text" placeholder="Ciudad/Departamento" id="ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}/>
                            </div>
                            <div className="div-row-info">
                                <label>¿Como nos conociste?</label>
                                <select onChange={e => setOrigen(e.target.value)} value={origen}>
                                    <option value="" disabled>Selecciona</option>
                                    <option value="Facebook Ads">Facebook</option>
                                    <option value="Instagram Ads">Instagram</option>
                                    <option value="Voz a Voz">Voz a Voz</option>
                                </select>
                            
                                
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" placeholder="Calle 23 #23-11 Barrio San Felipe Apto 330" id="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        {alerta.msg && 
                            <Alerta 
                                alerta={alerta}
                            />
                        }
                    </div>
                    <button className={`lg:hidden  boton-checkout`} onClick={handlesubmit}>
                        ENVIAR PEDIDO
                    </button>
                </div>
                <div className="informacion-pedido grid-item">
                    <h1 className="text-black">Tu Pedido</h1>
                    <div className="resumen-productos">
                        {carritomostrar.map(item => (
                            <Itemcheckout 
                                key={item.id}
                                item={item}
                                carritomostrar={carritomostrar}
                                setCarritoMostrar={setCarritoMostrar}
                            />
                        ))}
                    </div>
                    
                    <div className={`${tipocliente === 'Detal' ? 'hidden' : 'flex'} justify-between mt-8`}>
                        <p className="">Envio Contra Entrega</p>
                        <p className="text-blue-600 font-bold">GRATIS</p>
                    </div>
                    
                    <div className="flex justify-between mt-4 seccion-total">
                        <p className="">TOTAL</p>
                        <p className=" text-3xl">{`$${tipocliente === 'Detal' ? total.toLocaleString('es-CO') : total.toLocaleString('es-CO')}`}</p>
                    </div>

                    <div>
                        <h2 className="text-black mt-8">Paga en casa</h2>
                        <div className="flex justify-center mt-6">
                            <img className=" w-80" src="./inter.webp" alt="" />
                        </div>
                        
                        <p className="  px-8 py-6 text-center"> <span className=" font-bold">ENVIO TOTALMENTE</span><span className=" font-bold text-blue-600"> GRATIS</span> y recibe tu pedido entre 1-2 dias habiles (Pago en efectivo)</p>
                    </div>

                    <div className="ocultar-info-pedido">
                        {alerta.msg && 
                            <Alerta 
                                alerta={alerta}
                            />
                        }
                    </div>
                    
                    
                    <button className={`boton-info-pedido boton-checkout`} onClick={handlesubmit}>
                        ENVIAR PEDIDO
                    </button>

                    <div className={`${spinner ? 'block bgspiner' : 'hidden'}`}>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout