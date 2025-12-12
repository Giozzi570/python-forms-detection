function Ganador({ jugador1, jugador2 }) {

    function SeleccionarGanador() {
        if (jugador1.Datos.puntaje - jugador2.Datos.resta > jugador2.Datos.puntaje - jugador1.Datos.resta) {
            return jugador1.Datos.jugador.name
        } else {
            return jugador2.Datos.jugador.name
        }
    }
    function SeleccionarImg1() {
        if (jugador1.Datos.jugador.personaje === "SEAL") {
            return "./Personaje_4.png"
        } else if (jugador1.Datos.jugador.personaje === "Nathan") {
            return "./Personaje_3.png"
        } else if (jugador1.Datos.jugador.personaje === "Edzio") {
            return "./Personaje_2.png"
        } else {
            return "./Personaje_1.png"
        }
    }
    function SeleccionarImg2() {
        if (jugador2.Datos.jugador.personaje === "SEAL") {
            return "./Personaje_4.png"
        } else if (jugador2.Datos.jugador.personaje === "Nathan") {
            return "./Personaje_3.png"
        } else if (jugador2.Datos.jugador.personaje === "Edzio") {
            return "./Personaje_2.png"
        } else {
            return "./Personaje_1.png"
        }
    }
    return (
        <>
            <div id="ganador" className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-black">El ganador fue {SeleccionarGanador()}</h1>
                <div className="flex flex-row gap-8 p-6 bg-gray-100 rounded-xl shadow-lg">
                    <div className="flex bg-white rounded-xl p-4 shadow-md w-60 border border-gray-200">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-black text-xl font-bold mb-2 border-b pb-1">Jugador 1</h2>
                            <p className="text-gray-700 font-semibold">Nombre: <span className="font-normal">{jugador1.Datos.jugador.name}</span></p>
                            <p className="text-gray-700 font-semibold">Personaje: <span className="font-normal">{jugador1.Datos.jugador.personaje}</span></p>
                            <p className="text-gray-700 font-semibold">Puntaje: <span className="font-normal">{jugador1.Datos.puntaje - jugador2.Datos.resta}</span></p>
                            <p className="text-gray-700 font-semibold">Resta: <span className="font-normal">{jugador1.Datos.resta}</span></p>
                            <p className="text-gray-700 font-semibold">Multiplicador: <span className="font-normal">{jugador1.Datos.multiplicador}</span></p>
                            <p className="text-gray-700 font-semibold">Suma: <span className="font-normal">{jugador1.Datos.suma}</span></p>
                        </div>
                        <div>
                            <img src={SeleccionarImg1()} alt="" />
                        </div>
                    </div>

                    <div className="flex bg-white rounded-xl p-4 shadow-md w-60 border border-gray-200">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-black text-xl font-bold mb-2 border-b pb-1">Jugador 2</h2>
                            <p className="text-gray-700 font-semibold">Nombre: <span className="font-normal">{jugador2.Datos.jugador.name}</span></p>
                            <p className="text-gray-700 font-semibold">Personaje: <span className="font-normal">{jugador2.Datos.jugador.personaje}</span></p>
                            <p className="text-gray-700 font-semibold">Puntaje: <span className="font-normal">{jugador2.Datos.puntaje - jugador1.Datos.resta}</span></p>
                            <p className="text-gray-700 font-semibold">Resta: <span className="font-normal">{jugador2.Datos.resta}</span></p>
                            <p className="text-gray-700 font-semibold">Multiplicador: <span className="font-normal">{jugador2.Datos.multiplicador}</span></p>
                            <p className="text-gray-700 font-semibold">Suma: <span className="font-normal">{jugador2.Datos.suma}</span></p>
                        </div>

                        <div>
                            <img src={SeleccionarImg2()} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Ganador