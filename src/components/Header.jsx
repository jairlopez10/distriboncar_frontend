import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

const Header = () => {

    const navegar = useNavigate();
    const [menu, setmenu] = useState(false)

  return (
    <>
        <header>
            <div className="divheader contenedor">
                <div className="divbarra">
                    <div className="logo cursor-pointer" onClick={() => navegar("/catalogojuguetesl")}>
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'hidden' : 'block'} menuicono icon cursor-pointer icon-tabler icon-tabler-menu-2`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setmenu(!menu)}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 6l16 0" />
                        <path d="M4 12l16 0" />
                        <path d="M4 18l16 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'block' : 'hidden'} cursor-pointer menuicono icon icon-tabler icon-tabler-x`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setmenu(!menu)}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </div>
                <div className={`${menu ? "flex transition-all" : "hidden"} navegacion`}>
                    
                    {/*
                    <Link to="/" onClick={() => setmenu(false)}>Inicio</Link>
                    */}
                    <Link to="/catalogojuguetesl" className="jugueteslink" onClick={() => setmenu(false)}>Jugueteria</Link>
                    {/*
                    <Link to="/catalogoferreterial" className="ferreterialink" onClick={() => setmenu(false)}>Ferreteria</Link>
                    <Link to="/nosotros" onClick={() => setmenu(false)}>Nosotros</Link>
                    */}
                    
                </div>
            </div>
        </header>
    </> 
  )
}

export default Header