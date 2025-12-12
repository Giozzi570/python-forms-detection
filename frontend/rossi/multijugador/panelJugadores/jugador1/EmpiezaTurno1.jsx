import './EmpiezaTurno1.css'
import { useEffect,useState } from 'react'
import SeleccionDePersonaje from './ElegirPersonaje/SeleccionDePersonaje'
function EmpiezaTurno1({name,setTurno1,setTurno2,DatosJugador1,setDatosJugador1}){
    const [Finalizado,setFinalizado] = useState(false)
    const [Oculto,setOculto] = useState(false)
    const [TerminarSeleccionJugador,setTerminarSeleccionJugador] = useState(true)
    async function guardarDatosEnBackendWithWeb() {
    const datos = {
        jugador : JSON.parse(localStorage.getItem("jugador"))
    };
    console.log(datos);
    try {
      const response = await fetch("http://localhost:5000/guardarMultijugador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
      })
      if (!response.ok) throw new Error("❌ Falló el guardado");
      else { }
      const result = await response.json();
      console.log(result)
      setDatosJugador1(result)
    } catch (error) {
      if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
        error.message = "❌ No se pudo conectar al servidor";
      }
      console.log(error)
    }

  }
    const savePersonaje = (personaje) => {
        let jugador = {
            "name" : name,
            "personaje" : personaje
        }
        console.log(jugador)
        localStorage.setItem("jugador",JSON.stringify(jugador))
        guardarDatosEnBackendWithWeb()
    }
    useEffect(() => {
        const interval = setTimeout(() => {
            setFinalizado(true)
            setTimeout(() => {
                setOculto(true)
            },600)
        },1000)
        return () => clearTimeout(interval)
    },[])
    function terminarTurno(){
        setTurno2(true)
        setTurno1(false)
    }
    return(
        <>
        <div id="turno1" className={`h-screen flex items-center overflow-y-hidden justify-center animate__fadeInLeftBig animate__animated ${Finalizado ? "animate__fadeOutRightBig" : ""} ${Oculto ? "hidden" : ""}`}>
            <h1>Empieza el turno de {name}</h1>
        </div>
        <SeleccionDePersonaje Datos={DatosJugador1} Fondo={true} TerminarJuego={terminarTurno} msgFinal="Siguiente jugador" setTurno2={setTurno2} setTurno1={setTurno1} savePersonaje={savePersonaje} Background="./FondoMultijugador.png" TerminarSeleccionJugador={TerminarSeleccionJugador} setTerminarSeleccionJugador={setTerminarSeleccionJugador}/>
        </>
    )
}

export default EmpiezaTurno1