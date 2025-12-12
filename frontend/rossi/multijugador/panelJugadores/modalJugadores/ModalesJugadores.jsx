import React from 'react'
import ModalesJugador from './Modal'

const Personajes = {
    gamma: {
        nombre: "Gamma",
        descripcion: "El jugador Gamma le resta puntaje al jugador oponente aleatoriamente entre 500 y 4000 puntos",
    },
    alpha: {
        nombre: "Alpha",
        descripcion: "El jugador Alpha le suma puntaje aleatoriamente entre 1500 y 2500 puntos",
    },
    beta: {
        nombre: "Beta",
        descripcion: "El jugador Beta le resta puntaje al jugador oponente aleatoriamente entre 1 y 5 puntos",
    },
    delta: {
        nombre: "Delta",
        descripcion: "El jugador Delta le suma puntaje al jugador oponente aleatoriamente entre 1 y 5 puntos",
    },
}

const ModalesJugadores = ({PersonajeElegido}) => {
    return (
        <>
            {(PersonajeElegido === "Gamma") ? <ModalesJugador Nombre={Personajes.gamma.nombre} Descripcion={Personajes.gamma.descripcion}/> : null}
            {(PersonajeElegido === "Alpha") ? <ModalesJugador Nombre={Personajes.alpha.nombre} Descripcion={Personajes.alpha.descripcion}/> : null}
            {(PersonajeElegido === "Beta") ? <ModalesJugador Nombre={Personajes.beta.nombre} Descripcion={Personajes.beta.descripcion}/> : null}
            {(PersonajeElegido === "Delta") ? <ModalesJugador Nombre={Personajes.delta.nombre} Descripcion={Personajes.delta.descripcion}/> : null}
        </>
    )
}

export default ModalesJugadores