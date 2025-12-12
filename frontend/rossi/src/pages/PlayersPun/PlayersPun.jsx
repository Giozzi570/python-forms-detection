import React, { useState, useEffect, useRef } from "react";
import "./playersPun.css";
import Header from "../../components/header/header.jsx";
import ScreenError from "../../components/modals/screenError/ScreenError.jsx";
import SpinnerLoadingScreen from "../../components/modals/modalLoad.jsx";
import { dbPun } from "../../firebasePun.js";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FaEye } from "react-icons/fa";




const Players = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [graphUrl, setGraphUrl] = useState("");
  const [jugadaVisible, setJugadaVisible] = useState(null); 
  const [jugadaGraph, setGraph] = useState(null); 
  const [hiddenAll, setHiddenAll] = useState(false);
  const [hiddenError, setHiddenError] = useState(true);
  const [hideLoadActive, setHideLoadActive] = useState(true);
  const [jugadoresIterados, setJugadoresIterados] = useState([]);
  const [sinJugadores, setSinJugadores] = useState(true);
  const num = useRef(0);
  const [loadJugada, setLoadJugada] = useState(false);
  const [loadGraph, setLoadGraph] = useState(false)
  

  function verImagenJugada(id) {
    fetch(`http://localhost:5000/jugada/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setImgUrl(data.url);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => console.error(err));
  }

  function verImagenGrafico(id) {
    
    fetch(`http://localhost:5000/grafico/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setGraphUrl(data.url);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => console.error(err));

  }
  function volverLoadJugada(){
    setLoadJugada(false);
    setJugadaVisible(null);
    setImgUrl("");
  }
  function volverLoadGraph(){
    setLoadGraph(false);
    setGraph(null);
    setGraphUrl("");
  }
  function observarJugada(id){
    console.log("ID de la jugada seleccionada:", id);
    setJugadaVisible(true);
    verImagenJugada(id);
    
  }
  function observarGraph(id){
    console.log("ID del grafico seleccionado:", id);
    setGraph(true);
    verImagenGrafico(id);
  }
  const fetchJugadores = async () => {
    num.current += 5
    console.log(num)
    const inicio = Date.now();
    try {
      setHideLoadActive(true);
      const lotejugadores = query(collection(dbPun, "datos_guardados"),orderBy("puntaje","desc"),limit(num.current));
      const snapshot = await getDocs(lotejugadores)
      const jugadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const fin = Date.now();
      const ms = fin - inicio;
      console.log(`Tiempo de carga de jugadores: ${ms} ms`);
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

  useEffect(() => {
  fetchJugadores();
  }, []);

  useEffect(() => {
  setSinJugadores(jugadoresIterados.length === 0);
}, [jugadoresIterados]);

  const jugadoresTop = [...jugadoresIterados]
  .sort((a, b) => b.puntaje - a.puntaje)
  .slice(0, 3)
  .map((jugador, index) => ({ puesto: index + 1, ...jugador }));

  const jugadoresOtros = [...jugadoresIterados]
  .sort((a, b) => b.puntaje - a.puntaje)
  .map((jugador, index) => ({ puesto: index + 1, ...jugador }))
  .slice(3);
const getPodio = (puesto) => {
    switch (puesto) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  }
  const refreshJugadores = async () => {
    try {
      setHideLoadActive(true);
      const snapshot = await getDocs(collection(dbPun, "datos_guardados"));
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
    <p className="text-purple-800">Parece que todos se fueron a jugar a otra parte o aún no empezó el juego 🐾</p>

    <button
      className="mt-4 px-6 py-2 bg-purple-400 hover:bg-purple-500 text-purple-900 font-bold rounded-lg shadow-md transition"
      onClick={refreshJugadores}
    >
      Buscar jugadores
    </button>
  </div>
)}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          {[...jugadoresTop].map((jugador) => (
            <div id={`puesto-${jugador.puesto}`} data-id={jugador.id} key={jugador.id} className="w-64 h-auto text-center justify-between p-4 border bg-blue-500 border-gray-200 gap-6 rounded-lg flex shadow-sm hover:shadow-md transition items-center flex-col">
              <p className="text-gray-900 text-3xl font-black">{jugador.name}</p>
              <p className="text-xl text-center font-black text-gray-700">{jugador.puesto ? `${jugador.puesto}° Puesto` : ""}</p>
              <div className="bg-[#E0E7FF] text-black rounded-lg p-3">
                            <p className="text-3xl font-black text-chart-3">{jugador.puntaje}</p>
                            <p className="text-sm text-muted-foreground">puntos</p>
                          </div>
              {getPodio(jugador.puesto)}
              <button className="flex items-center gap-2" onClick={() => observarJugada(jugador.id)}><FaEye /> <p>Ver jugada</p></button>
              <button className="flex items-center gap-2" onClick={() => observarGraph(jugador.id)}><FaEye /> <p>Ver grafico</p></button>
            </div>
          ))}
        </div>
        <div className="flex lg:flex-col flex-row flex-wrap gap-4 justify-center items-center">
        {[...jugadoresOtros].map((jugador) => (
            <div key={jugador.id} id={`puesto-${jugador.puesto}`} className="w-full lg:w-auto lg:flex-row flex-col text-black p-4 border border-4 border-black gap-6 rounded-lg flex shadow-sm hover:shadow-md transition items-center justify-between">
               <p className="text-xl text-center font-black text-gray-700">{jugador.puesto ? `${jugador.puesto}°` : ""}</p>
               <p className="text-gray-900 text-3xl font-black text-wrap text-center">{jugador.name}</p>
              <div>
                 <div className="bg-[#E0E7FF] text-black rounded-lg p-3">
                            <p className="text-3xl font-black text-chart-3">{jugador.puntaje}</p>
                            <p className="text-sm text-muted-foreground">puntos</p>
                  </div>
              </div>
              <button className="flex items-center gap-2" onClick={() => observarJugada(jugador.id)}><FaEye /> <p>Ver jugada</p></button>
              <button className="flex items-center gap-2" onClick={() => observarGraph(jugador.id)}><FaEye /> <p>Ver grafico</p></button>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center p-4">
        <button className="px-4 py-2 bg-[#1e1e1e] text-[#9CDCFE] border border-[#3C3C3C] rounded-lg 
hover:bg-[#2a2a2a] hover:border-[#007ACC] transition-all duration-200" onClick={() => fetchJugadores() }>Cargar mas jugadores</button>
        </div>


      {/* Modal de jugada */}
      {jugadaVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 w-full">
          <div className="w-full max-w-lg max-h-[80vh] min-h-[65vh] gap-6 overflow-hidden bg-white text-black rounded-2xl shadow-xl border-4 border-black p-6 relative flex flex-col justify-end items-center animate-fade-in">
            {!loadJugada && (
              <div className="bg-gray-300 flex items-center justify-center animate-pulse rounded-2xl w-72 h-96"><SpinnerLoadingScreen></SpinnerLoadingScreen><p className="text-gray-950 font-bold">Cargando imagen...</p></div>
      )}

              <img
                className={"max-w-full max-h-full object-contain border-4 border-black rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 " + (loadJugada ? 'block' : 'hidden')}
                src={`${imgUrl}`}
                alt="jugada"
                id="jugadaImg"
                onLoad={() => setLoadJugada(true)}
              />
            

            <p className="text-2xl font-bold text-center mt-4 tracking-wide">{jugadaVisible.name}</p>

            <button
              onClick={() => volverLoadJugada()}
              className="mt-6 px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-lg font-semibold shadow-md"
            >
              Cerrar
            </button>
          </div>
        </div>
        
      )}
      {jugadaGraph && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 w-full">
          <div className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl border-4 border-black p-6 relative flex flex-col items-center animate-fade-in">
            {!loadGraph && (
              <div className="bg-gray-300 flex items-center justify-center animate-pulse rounded-2xl w-72 h-96"><SpinnerLoadingScreen></SpinnerLoadingScreen><p className="text-gray-950 font-bold">Cargando imagen...</p></div>
      )}
            <img
              className={"border-4 border-black rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 " + (loadGraph ? 'block' : 'hidden')}
              src={`${graphUrl}`}
              alt="jugada"
              id="graphImg"
              width={250}
              onLoad={() => setLoadGraph(true)}
            />

            <p className="text-2xl font-bold text-center mt-4 tracking-wide">{jugadaGraph.name}</p>

            <button
              onClick={() => volverLoadGraph()}
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
