import React from 'react'
import App from '../../src/components/header/header'
import Jugador from './jugadores/jugador/Jugador'
import './PanelJugadores.css'
import { useState,useEffect } from 'react'
import EmpiezaTurno1 from './jugador1/EmpiezaTurno1'
import EmpiezaTurno2 from './jugador2/EmpiezaTurno2'
import Ganador from '../Ganador/Ganador'

const PanelJugadores = () => {
    const [DatosJugador1,setDatosJugador1] = useState(false)
    const [DatosJugador2,setDatosJugador2] = useState(false)
    const [Listo1,setListo1] = useState(false)
    const [Listo2,setListo2] = useState(false)
    const [Contador,setContador] = useState(3)
    const [Nombre1,setNombre1] = useState("")
    const [Nombre2,setNombre2] = useState("")
    const [ErrorNombre,setErrorNombre] = useState(false)
    const [start,setStart] = useState(true)
    const [turno1,setTurnoJugador1] = useState(false)
    const [turno2,setTurnoJugador2] = useState(false)
    const [ganador,setGanador] = useState(false)
    const ListoCompleto = Listo1 && Listo2
    const NombresCompletos = Nombre1 !== "" && Nombre2 !== "" ? true : false


    console.log("turno1",turno1)
    console.log("turno2",turno2)
    console.log("DatosJugador1",DatosJugador1)
    console.log("DatosJugador2",DatosJugador2)

    useEffect(() => {
        if(ListoCompleto){
            if(NombresCompletos){
                setErrorNombre(false)
                const interval = setTimeout(() => {
                    setContador(Contador - 1)
                },1000)
                if(Contador === 0){
                    clearTimeout(interval)
                    setContador(3)
                    setListo1(false)
                    setListo2(false)
                    setStart(false)
                    setTurnoJugador1(true)
                }
            }else{
                setErrorNombre(true)
            }
        if(NombresCompletos){
            setErrorNombre(false)
        }
    } 
    })
    
    return (
        <>
        {
        start && <App />
        }
        {
        start && <div className='mt-32 w-1/2 h-76 mx-auto flex flex-row ' id='multijugador'>
            <div id='jugadorAlpha' className='h-full w-full mr-8'>
                <Jugador jugador={1} Listo={Listo1} setListo={setListo1} Nombre={Nombre1} setNombre={setNombre1} />
            </div>
            <div className='w-full flex-1 min-w-36 flex flex-col justify-end items-center'>
                <div className='flex flex-col'>
                    {ListoCompleto && NombresCompletos && `La partida iniciara en ${Contador}`}
                    {ErrorNombre && "Por favor, ingrese un nombre para cada jugador"}

                </div>
            </div>
            <div id='jugadorBeta' className='h-full w-full ml-8'>
                <Jugador jugador={2} Listo={Listo2} setListo={setListo2} Nombre={Nombre2} setNombre={setNombre2} />
            </div>
        </div>}
        {turno1 && <EmpiezaTurno1 name={Nombre1} turno1={turno1} setTurno1={setTurnoJugador1} setTurno2={setTurnoJugador2} setDatosJugador1={setDatosJugador1} DatosJugador1={DatosJugador1} />}
        {turno2 && <EmpiezaTurno2 name={Nombre2} turno2={turno2} setTurno2={setTurnoJugador2} setGanador={setGanador} setDatosJugador2={setDatosJugador2} DatosJugador2={DatosJugador2} />}
        <button onClick={() => {console.log("DatosJugador1",DatosJugador1);console.log("DatosJugador2",DatosJugador2)}}>Terminar Juego</button>
        {ganador && <Ganador jugador1={DatosJugador1} jugador2={DatosJugador2} />}

        </>
    )
}

export default PanelJugadores