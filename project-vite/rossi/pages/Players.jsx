import React, { useState, useEffect } from "react";
import "./players.css";
import Header from "../src/components/header/header";
import ScreenError from "../src/components/modals/screenError/ScreenError.jsx";
export function refreshJugadores() {
  location.reload();
}

const Players = () => {
  async function jugadoresTerminados() {
  try {
    const response = await fetch("http://localhost:5000/api/datos");
    if (!response.ok) throw new Error("Error al obtener los jugadores");
    const data = await response.json();
    localStorage.setItem("jugadoresTerminados", JSON.stringify(data));
    return data;
  } catch (error) {
    setHiddenError(!hiddenError);
    setHiddenAll(!hiddenAll);
    console.error("Error:", error);
    localStorage.setItem("Error", error.message);
    return [];
  }
}

function TopJugadores() {
  const jugadores = localStorage.getItem("jugadoresTerminados");
  const jugadoresTops = jugadores ? JSON.parse(jugadores) : [];
  const jugadoresTopsOrdenados = [...jugadoresTops].sort((a, b) => b.puntaje - a.puntaje);
  return jugadoresTopsOrdenados.slice(0, 3).map((jugador, index) => ({
    puesto: index + 1,
    ...jugador
  }));
}


function getJugadoresTerminados() {
  const jugadores = localStorage.getItem("jugadoresTerminados");
  const jugadoresGuardados = jugadores ? JSON.parse(jugadores) : [];
  const jugadoresActivosOrdenados = [...jugadoresGuardados].sort((a, b) => b.puntaje - a.puntaje);
  jugadoresActivosOrdenados.splice(0, 3); // remover top 3
  return jugadoresActivosOrdenados;
}
  const [jugadaVisible, setJugadaVisible] = useState(null); // `null` = ningún jugador seleccionado

  const [imagen, setImagen] = useState(true);
  const jugadoresTop = TopJugadores();
  const jugadoresOtros = getJugadoresTerminados();
   useEffect(() => {
    jugadoresTerminados(); // obtener jugadores al cargar
  }, []);
  const [hiddenAll, setHiddenAll] = useState(false);
  const [hiddenError, setHiddenError] = useState(true);

  return (
    <>
      <Header />
      <div className={`w-full mx-auto p-4 bg-white ${hiddenAll ? "hidden" : ""}`} id="pepe">
        <h2 className="text-2xl font-bold text-center mb-6">Jugadores</h2>

        <div className="flex flex-col gap-4 justify-center items-center">
          {[...jugadoresTop, ...jugadoresOtros].map((jugador) => (
            <div key={jugador.id} id={`puesto-${jugador.puesto}`} className="w-1/2 p-4 border bg-blue-500 border-gray-200 gap-6 rounded-lg flex shadow-sm hover:shadow-md transition items-center flex-col">
              <p className="text-gray-900 text-3xl font-black">{jugador.name}</p>
              <p className="text-xl text-center font-black text-gray-700">{jugador.puesto ? `${jugador.puesto}° Puesto` : ""}</p>
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-black">
                <p className="text-xl font-black text-white">{jugador.puntaje}</p>
              </div>
              <button onClick={() => setJugadaVisible(jugador)}>Ver jugada</button>
            </div>
          ))}
        </div>

        <button className="mt-10 mx-auto block bg-blue-500 text-white px-6 py-2 rounded" onClick={refreshJugadores}>
          Actualizar Jugadores
        </button>


      {/* Modal de jugada */}
      {jugadaVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 w-full">
          <div className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl border-4 border-black p-6 relative flex flex-col items-center animate-fade-in">
            
            <img
              className="border-4 border-black rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              src={`http://localhost:5000/${jugadaVisible.img}`}
              alt="jugada"
            />

            <p className="text-2xl font-bold text-center mt-4 tracking-wide">{jugadaVisible.name}</p>

            <button
              onClick={() => setJugadaVisible(null)}
              className="mt-6 px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-lg font-semibold shadow-md"
            >
              Cerrar
            </button>
          </div>
        </div>
        
      )}
   </div>
      {/* Mensaje de error */}
      <ScreenError hiddenError={hiddenError} refreshJugadores={refreshJugadores} error={localStorage.getItem("Error")} />
      {/* Mensaje de error */}
    </>
  );
};

export default Players;
