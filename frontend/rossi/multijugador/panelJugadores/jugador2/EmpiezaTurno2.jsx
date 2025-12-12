import './EmpiezaTurno2.css'
import { useEffect,useState } from 'react'
import SeleccionDePersonaje from '../jugador1/ElegirPersonaje/SeleccionDePersonaje'
function EmpiezaTurno2({name,setTurno2,setGanador,DatosJugador2,setDatosJugador2}){
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
      setDatosJugador2(result)
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
    function terminarJuego(){
        setTurno2(false)
        setGanador(true)
    }
    return(
        <>
        <div id="turno2" className={`h-screen flex items-center justify-center animate__fadeInLeftBig animate__animated ${Finalizado ? "animate__fadeOutRightBig" : ""} ${Oculto ? "hidden" : ""}`}>
            <h1>Empieza el turno de {name}</h1>
        </div>
        <SeleccionDePersonaje msgFinal={"¿Ver quien gano?"} TerminarJuego={terminarJuego} Fondo={false} Datos={DatosJugador2} savePersonaje={savePersonaje} Background="./FondoMultijugadorReverse.png" TerminarSeleccionJugador={TerminarSeleccionJugador} setTerminarSeleccionJugador={setTerminarSeleccionJugador}/>
        </>
    )
}

export default EmpiezaTurno2