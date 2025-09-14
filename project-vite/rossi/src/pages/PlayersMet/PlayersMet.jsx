import React, { useState, useEffect } from "react";
import "./playersMet.css";
import Header from "../../components/header/header.jsx";
import ScreenError from "../../components/modals/screenError/ScreenError.jsx";
import SpinnerLoadingScreen from "../../components/modals/modalLoad.jsx";
import { dbMet } from "../../firebaseMet.js";
import appMet from "../../firebaseMet.js";
import { collection, getDocs } from "firebase/firestore";
import { FaEye } from "react-icons/fa";




const Players = () => {
  const [jugadaVisible, setJugadaVisible] = useState(null); 
  const [imagen, setImagen] = useState(true);
  const [hiddenAll, setHiddenAll] = useState(false);
  const [hiddenError, setHiddenError] = useState(true);
  const [hideLoadActive, setHideLoadActive] = useState(true);
  const [jugadoresIterados, setJugadoresIterados] = useState([]);
  const [sinJugadores, setSinJugadores] = useState(true);



  useEffect(() => {
  const fetchJugadores = async () => {
    try {
      setHideLoadActive(true);
      const snapshot = await getDocs(collection(dbMet, "datos_guardados"));
      const jugadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJugadoresIterados(jugadores);
      setHideLoadActive(false);
    } catch (error) {
      setHideLoadActive(false);
      setSinJugadores(false)
      setHiddenError(false);
      setHiddenAll(false);
      console.error("El Error:", error);
    }
  };
  fetchJugadores();
  }, []);

  useEffect(() => {
  setSinJugadores(jugadoresIterados.length === 0);
}, [jugadoresIterados]);
  
  const refreshJugadores = async () => {
    try {
      setHideLoadActive(true);
      const snapshot = await getDocs(collection(dbMet, "datos_guardados"));
      const jugadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJugadoresIterados(jugadores);
      setHideLoadActive(false);
    } catch (error) {
      setHideLoadActive(false);
      setHiddenError(false);
      setHiddenAll(false);
      setSinJugadores(false)
      console.error("Error:", error);
    }
};
  return (
    <>
      <Header />
      <div className={`w-full mx-auto p-4 bg-white mt-4 ${hiddenAll ? "hidden" : ""}`} id="pepe">
        <h2 className="text-2xl font-bold text-center mb-6">Jugadores</h2>
      {sinJugadores && (
  <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-purple-100 border-2 border-purple-300 shadow-lg text-center animate-fade-in">
    
    {/* Gatito estilo SVG */}
    <img src="./power.png" alt="Gatito" />

    <p className="text-2xl font-bold text-purple-900">¡Ups! No hay jugadores</p>
    <p className="text-purple-800">Parece que todos se fueron a jugar a otra parte o aún no empezo el juego 🐾</p>

    <button
      className="mt-4 px-6 py-2 bg-purple-400 hover:bg-purple-500 text-purple-900 font-bold rounded-lg shadow-md transition"
      onClick={refreshJugadores}
    >
      Buscar jugadores
    </button>
  </div>
)}
        <div className="flex flex-col gap-4 justify-center items-center w-full">
                {[...jugadoresIterados].map((jugador) => (
                    <div key={jugador.id} id={`puesto-${jugador.puesto}`} className="lg:w-1/2 w-auto flex-wrap justify-center text-black p-4 border border-4 border-black gap-6 rounded-lg flex shadow-sm hover:shadow-md transition items-center lg:justify-between">
                       <p className="text-xl text-center font-black text-gray-700">{jugador.puesto ? `${jugador.puesto}°` : ""}</p>
                       <p className="text-gray-900 text-3xl font-black">{jugador.name}</p>
                      <div>
                         <div className="bg-[#E0E7FF] text-black rounded-lg p-3">
                                    <p className="text-3xl font-black text-center text-wrap">{jugador.gano ? <span>¡Ganó!</span> : <span>Perdió</span>} <span className="text-muted-foreground">con {jugador.instrument}</span></p>
                          </div>
                      </div>
                      <button className="flex items-center gap-2" onClick={() => setJugadaVisible(jugador)}><FaEye /> <p>Ver jugada</p></button>
                    </div>
                  ))}
        </div>


      {/* Modal de jugada */}
      {jugadaVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 w-full">
          <div className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl border-4 border-black p-6 relative flex flex-col items-center animate-fade-in">
            
            <img
              className="border-4 border-black rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              src={`data:image/webp;base64,${jugadaVisible.img}`}
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
      {hideLoadActive && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500">
    <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-6 w-80 animate-fade-in">
      
      {/* Título */}
      <p className="text-gray-900 font-extrabold text-2xl text-center">
        Espere mientras cargamos los jugadores
      </p>

      {/* Perrito corriendo */}
      <div className="relative w-24 h-24">
        <img 
          src="./runningDog.png" 
          alt="DogRunning" 
          className="w-full h-full animate-running-dog"
        />
      </div>

      {/* Spinner */}
      <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center shadow-inner">
        <SpinnerLoadingScreen />
      </div>

      {/* Mensaje de búsqueda con lupa */}
      <div className="flex gap-2 items-center mt-2 ">
        <p className="text-gray-800 font-semibold animate-pulse">Buscando jugadores...</p>
        <img src="./lupa.png" width={20} alt="Lupa" className="animate-ping" />
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Players;
