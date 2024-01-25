import { useState } from "react"
import { GoogleSpreadsheet } from "google-spreadsheet";

const Pedido = () => {

    const [nombre, setNombre] = useState('');
    const [ciudad, setCiudad] = useState('');
    
    const handlesubmit = () => {

        const data = [nombre, ciudad];

        const spreadsheet = new GoogleSpreadsheet({
            spreadsheetId: "1Zw5bhwjQrjxwFk86jpAKxwsh6t95Va2l0V_GdCU7AoE",
            token: "AIzaSyBW5syA_-3zx7nfefBPsrxmvol3zY9qQag"
        })

        spreadsheet.values.append({
            spreadsheetId: "1Zw5bhwjQrjxwFk86jpAKxwsh6t95Va2l0V_GdCU7AoE",
            range: "Sheet2!A1",
            values: data,
        })
        .then(() => {
            console.log('Datos enviados correctamente')
        })
        .catch(error => console.log(error))

    }

  return (
    <>
        <div>
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" className="" onChange={e => setNombre(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="ciudad">Ciudad: </label>
            <input type="text" className="" onChange={e => setCiudad(e.target.value)}/>
        </div>
        <button onClick={handlesubmit}>Enviar Formulario</button>
    </>
  )
}

export default Pedido