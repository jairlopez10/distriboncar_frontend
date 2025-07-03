import { useEffect } from "react"
import usePagina from "../hooks/usePagina";

const Nosotros = () => {

  const { setPagina, pagina } = usePagina()

  useEffect(() => {
    if(pagina === 'inicio'){
      setPagina('Jair')
    }
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <div className="separaheader contenedor">
        <h1>NOSOTROS</h1>
        <div className="imagen-nosotros">
          <img src="/jair.webp" alt="imagen-jair" />
        </div>

        <div className="p-contactar">
            <p className="text-center">¡Bienvenidos a Distriboncar, donde cada proyecto toma forma y cada idea se convierte en realidad! Somos un equipo apasionado por la construcción, el hogar y la industria, comprometidos en ofrecer herramientas, materiales y soluciones de la más alta calidad. Nos especializamos en brindar productos innovadores, resistentes y asequibles para hacer tu trabajo más fácil y eficiente. Realizamos envíos a cualquier parte del país, así que cuéntanos qué necesitas para hacer posible tu próximo gran proyecto.</p>
            <div className="flex justify-center mt-8 divconta">
              <p className="titulo-contactanos uppercase">Redes Sociales</p>
            </div>
            
            <div className="flex justify-around mt-12">
              <img className="imagenredsocial" src="/facebook.webp" alt="imagen-facebook" onClick={() => window.open("https://www.facebook.com/profile.php?id=61556009770678")} />
              <img className="imagenredsocial" src="/instagram.webp" alt="imagen-instagram" onClick={() => window.open("https://www.instagram.com/distriboncar?igsh=Z3F6c3Aycnlicjlh&utm_source=qr")} />
              <img className="imagenredsocial" src="/wa.webp" alt="imagen-whatsapp" onClick={() => window.open("https://wa.me/573134880183?text=Hola%20Distriboncar!%20Quisiera%20saber%20mas%20informacion%20sobre%20")} />
              <img className="imagenredsocial" src="/tiktok.webp" alt="imagen-tiktok" onClick={() => window.open("https://www.tiktok.com/@distribucionesboncar?_t=ZS-8vCyShoRaR5&_r=1")} />
            </div>
          </div>
      </div>
    </>
  )
}

export default Nosotros