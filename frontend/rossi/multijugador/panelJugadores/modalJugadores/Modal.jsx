const ModalesJugador = ({Nombre, Descripcion}) => {
    return (
        <div>
            <h2>{Nombre}</h2>
            <p>{Descripcion}</p>
            <button>Elegir {Nombre}</button>
        </div>
    )
}

export default ModalesJugador