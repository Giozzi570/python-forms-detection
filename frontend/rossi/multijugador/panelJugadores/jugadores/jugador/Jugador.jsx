import React, { useState } from 'react'
import ModalesJugadores from '../../modalJugadores/ModalesJugadores'
const jugadores = ["Gamma","Alpha","Beta","Delta"]
const Jugador = ({jugador,Listo,setListo,Nombre,setNombre}) => {

    return (
        <div className='text-black flex flex-col justify-around items-center h-full' id='jugador'>
            <h2>Jugador {Nombre || "???"}</h2>
            <input type="text" className='text-center hover:border-none hover:border-none focus:outline-none focus:ring-none focus:ring-none w-78' onChange={(e) => setNombre(e.target.value)} placeholder='Escriba su nombre'/>
            <button className={` text-white font-bold py-2 px-4 rounded ${Listo ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"}`} onClick={() => setListo(!Listo)}>{Listo ? "Listo" : "No Listo"}</button>
            
        </div>
    )
}

export default Jugador