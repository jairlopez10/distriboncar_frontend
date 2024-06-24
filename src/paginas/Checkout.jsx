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
    const [email, setEmail] = useState('');
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
        document.title = 'Checkout - Distribuciones Boncar'
        
        const datestorage = JSON.parse(localStorage.getItem('authdistribucionesboncar')) || {}

        if(datestorage.mes){
            
            if(datestorage.tipocliente === 'Mayorista'){
                setTipocliente('Mayorista')
            } else {
                setTipocliente('Detal')
            }
        }


    }, [])

    const handlesubmit = async (e) => {
        e.preventDefault();

        setSpinner(true);

        //Revisar si algun campo esta vacio y generar alerta
        if([nombres, telefono, email, origen, ciudad, direccion].includes('')){
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
            productos: carritomostrar,
            productostext,
            ciudad,
            direccion,
            telefono,
            total
        }

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
            //window.open(`https://wa.me/573204289310?text=${texto1url+'%2C%0D'+'%20'+'%2C%0D'+pedidourltext}`, '_blank');
            setNombres('');
            setTelefono('');
            setEmail('');
            setCiudad('');
            setOrigen('');
            setDireccion('')
            
        } catch (error) {
            console.log(error);
        }

    }

    const convertirtextoaurlwa = (texto) => {
        return texto.replace(/ /g, "%20")
    }

  return (
    <>
        <div className="contenedor-checkout">
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
                                <label htmlFor="email">Email:</label>
                                <input type="email" placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
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
                        <p className=" font-bold">Descuento - 5 %</p>
                        <p>{`- $${(total*0.05).toLocaleString('es-CO')}`}</p>
                    </div>
                    
                    <div className="flex justify-between mt-8 seccion-total">
                        <p className=" font-bold">TOTAL</p>
                        <p className=" text-3xl">{`$${tipocliente === 'Detal' ? total.toLocaleString('es-CO') : (total*0.95).toLocaleString('es-CO')}`}</p>
                    </div>

                    <div>
                        <h2 className="text-black mt-8">Formas de Envio</h2>
                        <div className="envios-fotos">
                            <img className="" src="./truck.png" alt="" />
                            <img className="" src="./contraentrega.jpg" alt="" />
                        </div>
                        <p className="  px-8 py-6 text-center"><span className=" font-bold">CLIENTE PAGA EL FLETE</span> - enviamos tu pedido en <span className="font-bold">1-2 dias habiles</span></p>
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