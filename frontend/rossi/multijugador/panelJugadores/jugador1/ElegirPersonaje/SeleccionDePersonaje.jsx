
import './SeleccionDePersonaje.css'
import { useState } from 'react'
export default function SeleccionDePersonaje({ Background = "./FondoMultijugador.png",setTurno1,setTurno2,msgFinal,Fondo,TerminarJuego, TerminarSeleccionJugador, setTerminarSeleccionJugador, savePersonaje, Datos }) {

    const [HoverPersonaje, setHoverPersonaje] = useState("Peter Pan")
    const [personaje, setPersonaje] = useState(null)

    // function seleccionarPersonaje(personaje) {
    //     setPersonaje(personaje)
    //     setTerminarSeleccionJugador(false)
    // }
    // const Personajes = {
    //     "Peter Pan": {
    //         nombre: "Peter Pan",
    //         descripcion: "El jugador Peter Pan le resta puntaje al jugador oponente aleatoriamente entre 1000 y 2000 puntos",
    //     },
    //     "Edzio": {
    //         nombre: "Edzio",
    //         descripcion: "El jugador Edzio le suma puntaje aleatoriamente entre 1000 y 2000 puntos",
    //     },
    //     "Nathan": {
    //         nombre: "Nathan",
    //         descripcion: "El jugador Nathan le suma una ficha mas para tirar",
    //     },
    //     "SEAL": {
    //         nombre: "SEAL",
    //         descripcion: "El jugador SEAL tiene un multiplicador fijo de puntaje del 0.8 a 1.2. En caso de que el puntaje sea negativo, SEAL lo convierte en 0",
    //     },
    // }
    // const ImgPersonajesCombo1 = [{ "Name": "Peter Pan", "Img": "./Personaje_1.png" }, { "Name": "Edzio", "Img": "./Personaje_2.png" }]
    // const ImgPersonajesCombo2 = [{ "Name": "Nathan", "Img": "./Personaje_3.png" }, { "Name": "SEAL", "Img": "./Personaje_4.png" }]

    return (
        <>
            <div id='SeleccionDePersonaje' className="flex flex-col justify-around items-center h-screen text-black" style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* {TerminarSeleccionJugador && <h1>Seleccione un personaje</h1>}
                {TerminarSeleccionJugador && <div className="flex justify-around w-full items-center gap-4">
                    <div className='rounded-xl flex-col flex justify-center items-center gap-8'>
                        <div className="flex flex-row justify-center items-center gap-8">
                            {ImgPersonajesCombo1.map((personaje) => (
                                <img width={240} key={personaje.Name} className={`${Fondo ? "bg-orange-800" : "bg-blue-800"} border-4 cursor-pointer rounded-xl border-black hover:scale-110 ${Fondo ? "hover:bg-orange-300" : "hover:bg-blue-300"} transition-all duration-300`} onClick={() => seleccionarPersonaje(personaje.Name)} src={personaje.Img} onMouseOver={() => setHoverPersonaje(personaje.Name)} alt={"Personaje " + personaje.Name} />
                            ))}
                        </div>
                        <div className="flex flex-row justify-center items-center gap-8">
                            {ImgPersonajesCombo2.map((personaje) => (
                                <img width={240} key={personaje.Name} className={`${Fondo ? "bg-orange-800" : "bg-blue-800"} border-4 cursor-pointer rounded-xl border-black hover:scale-110 ${Fondo ? "hover:bg-orange-300" : "hover:bg-blue-300"} transition-all duration-300`} onClick={() => seleccionarPersonaje(personaje.Name)} src={personaje.Img} onMouseOver={() => setHoverPersonaje(personaje.Name)} alt={"Personaje " + personaje.Name} />
                            ))}
                        </div>
                    </div>
                    <div className={`${Fondo ? "bg-orange-500" : "bg-blue-500"} rounded-xl flex flex-col justify-center items-center p-4 h-1/2 text-center text-white w-1/2`}>
                        {Personajes[HoverPersonaje].descripcion}
                    </div>
                </div>} */}
                {!Datos && <>
                    <div className={`${Fondo ? "bg-orange-500" : "bg-blue-500"} flex flex-col justify-center items-center gap-4 bg-white rounded-xl p-4 w-1/2`}>
                        <p>Empieze a tirar sus fichas</p>
                        {/* <p>Su personaje elegido fue {personaje}</p>
                        <p className='w-1/2 text-center'>Luego de terminar su turno, se le dara el resultado de la habilidad del personaje que eligio</p> */}
                        <button className={`${Fondo ? "bg-orange-500" : "bg-blue-500"} rounded-xl p-4 text-white`} onClick={() => savePersonaje(null)}>Terminar Turno</button>
                    </div>

                </>}
                {Datos && <>
                    <div className={`${Fondo ? "flex flex-col justify-center items-center gap-4 rounded-xl p-4 w-1/2 bg-gradient-to-r from-orange-200 to-orange-400 border-4 border-black" : "flex flex-col justify-center items-center gap-4 rounded-xl p-4 w-1/2 bg-gradient-to-r from-blue-500 to-blue-800 border-4 border-black"}`}  >
                        <h3>Las estadisticas de {Datos.Datos.jugador.name} son:</h3>
                        <p>El puntaje es de {Datos.Datos.puntaje}</p>
                        <button className={`${Fondo ? "bg-orange-500" : "bg-blue-500"} rounded-xl p-4 text-white`} onClick={() => TerminarJuego()}>{msgFinal}</button>
                    </div>
                </>}
            </div>
        </>
    )
}