import { useNavigate } from "react-router-dom"

const Footer = () => {

  const navegar = useNavigate();

  return (
    <>
      <footer>
        <div className="divfooter" onClick={() => navegar("/")}>
          <img src="/logo.png" alt="logo footer" />
        </div>
      </footer>
    </>
  )
}

export default Footer