import Board from "../Board";
import App from "../../header/header";
import ModalPromedio from "../../modals/modalPromedio/ModalPromedio";
import { use, useState } from "react";
import { dbPun } from "../../../firebasePun";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);
let posiciones = [];

const BoardEstadisticas = () => {
  const [circulosMostrar, setCirculosMostrar] = useState(false)
  const [circulos, setCirculos] = useState([])
  const circlesList = []
  const circles = circulos?.map((circle) => {
    console.log("circulos 231cdzxxdxdxd",circulos)
    console.log("circle", circle)
    for (let i = 0; i < circulos[0].length; i++) {
      const x = circle[i]["x"]
      const y = circle[i]["y"]

      const circleData = [x, y]

      circlesList.push(circleData)
    }
    return circlesList

  })
  const [names, setNames] = useState([])
  const [posicionElegida, setPosicionElegida] = useState(0)
  const [error, setError] = useState(false)
  const PedirJugadores = async () => {
    try {
      const lotejugadores = query(collection(dbPun, "datos_guardados"));
      const snapshot = await getDocs(lotejugadores)
      const jugadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(jugadores)
      setJugadores(jugadores);
    } catch (error) {
      console.error("El Error:", error);
    }
  };
  const pedirCirculos = async () => {
    try {
      const lotejugadores = query(collection(dbPun, "datos_guardados"));
      const snapshot = await getDocs(lotejugadores)
      const circulos = snapshot.docs.map(doc => doc.data().posicion_circulos_px);
      setCirculos(circulos);
    } catch (error) {
      console.error("El Error:", error);
    }
  };
  const promediarJugadores = () => {
    PedirJugadores()
    console.log(jugadores)
    promediarPosiciones()
    pedirCirculos()
  }
  const [jugadores, setJugadores] = useState([])
  const [modal, setModal] = useState(false)
  const promediarPosiciones = () => {
    posiciones = []
    for (const jugador of jugadores) {
      console.log(jugador)
      for (const posicion of jugador.posicion_del_circulo) {
        posiciones[`posicion-${posicion}`] = { names: [...(posiciones[`posicion-${posicion}`]?.names || []), jugador.name], cantidad: (posiciones[`posicion-${posicion}`]?.cantidad || 0) + 1 };
      }
    }
    console.log(posiciones)
  }
  const [estadisticas, setEstadisticas] = useState(true)

  const PedirInfoCantidadPosiciones = (posicion) => {
    try {
      setError(false)
      if (posicion == "1") {
        setPosicionElegida(posiciones[`posicion-28`].cantidad)
        setNames(posiciones[`posicion-28`].names)
      }
      if (posicion == "2") {
        setPosicionElegida(posiciones[`posicion-21`].cantidad)
        setNames(posiciones[`posicion-21`].names)
      }
      if (posicion == "3") {
        setPosicionElegida(posiciones[`posicion-14`].cantidad)
        setNames(posiciones[`posicion-14`].names)
      }
      if (posicion == "4") {
        setPosicionElegida(posiciones[`posicion-7`].cantidad)
        setNames(posiciones[`posicion-7`].names)
      }
      if (posicion == "5") {
        setPosicionElegida(posiciones[`posicion-0`].cantidad)
        setNames(posiciones[`posicion-0`].names)
      }
      if (posicion == "6") {
        setPosicionElegida(posiciones[`posicion-29`].cantidad)
        setNames(posiciones[`posicion-29`].names)
      }
      if (posicion == "7") {
        setPosicionElegida(posiciones[`posicion-22`].cantidad)
        setNames(posiciones[`posicion-22`].names)
      }
      if (posicion == "8") {
        setPosicionElegida(posiciones[`posicion-15`].cantidad)
        setNames(posiciones[`posicion-15`].names)
      }
      if (posicion == "9") {
        setPosicionElegida(posiciones[`posicion-8`].cantidad)
        setNames(posiciones[`posicion-8`].names)
      }
      if (posicion == "10") {
        setPosicionElegida(posiciones[`posicion-1`].cantidad)
        setNames(posiciones[`posicion-1`].names)
      }
      if (posicion == "11") {
        setPosicionElegida(posiciones[`posicion-30`].cantidad)
        setNames(posiciones[`posicion-30`].names)
      }
      if (posicion == "12") {
        setPosicionElegida(posiciones[`posicion-23`].cantidad)
        setNames(posiciones[`posicion-23`].names)
      }
      if (posicion == "13") {
        setPosicionElegida(posiciones[`posicion-16`].cantidad)
        setNames(posiciones[`posicion-16`].names)
      }
      if (posicion == "14") {
        setPosicionElegida(posiciones[`posicion-9`].cantidad)
        setNames(posiciones[`posicion-9`].names)
      }
      if (posicion == "15") {
        setPosicionElegida(posiciones[`posicion-2`].cantidad)
        setNames(posiciones[`posicion-2`].names)
      }
      if (posicion == "16") {
        setPosicionElegida(posiciones[`posicion-31`].cantidad)
        setNames(posiciones[`posicion-31`].names)
      }
      if (posicion == "17") {
        setPosicionElegida(posiciones[`posicion-24`].cantidad)
        setNames(posiciones[`posicion-24`].names)
      }
      if (posicion == "18") {
        setPosicionElegida(posiciones[`posicion-17`].cantidad)
        setNames(posiciones[`posicion-17`].names)
      }
      if (posicion == "19") {
        setPosicionElegida(posiciones['posicion-10'].cantidad)
        setNames(posiciones[`posicion-10`].names)
      }
      if (posicion == "20") {
        setPosicionElegida(posiciones['posicion-3'].cantidad)
        setNames(posiciones[`posicion-3`].names)
      }
      if (posicion == "21") {
        setPosicionElegida(posiciones['posicion-32'].cantidad)
        setNames(posiciones[`posicion-32`].names)
      }
      if (posicion == "22") {
        setPosicionElegida(posiciones['posicion-25'].cantidad)
        setNames(posiciones[`posicion-25`].names)
      }
      if (posicion == "23") {
        setPosicionElegida(posiciones['posicion-18'].cantidad)
        setNames(posiciones[`posicion-18`].names)
      }
      if (posicion == "24") {
        setPosicionElegida(posiciones['posicion-11'].cantidad)
        setNames(posiciones[`posicion-11`].names)
      }
      if (posicion == "25") {
        setPosicionElegida(posiciones['posicion-4'].cantidad)
        setNames(posiciones[`posicion-4`].names)
      }
      if (posicion == "26") {
        setPosicionElegida(posiciones['posicion-33'].cantidad)
        setNames(posiciones[`posicion-33`].names)
      }
      if (posicion == "27") {
        setPosicionElegida(posiciones['posicion-26'].cantidad)
        setNames(posiciones[`posicion-26`].names)
      }
      if (posicion == "28") {
        setPosicionElegida(posiciones['posicion-19'].cantidad)
        setNames(posiciones[`posicion-19`].names)
      }
      if (posicion == "29") {
        setPosicionElegida(posiciones['posicion-12'].cantidad)
        setNames(posiciones[`posicion-12`].names)
      }
      if (posicion == "30") {
        setPosicionElegida(posiciones['posicion-5'].cantidad)
        setNames(posiciones[`posicion-5`].names)
      }
      if (posicion == "31") {
        setPosicionElegida(posiciones['posicion-34'].cantidad)
        setNames(posiciones[`posicion-34`].names)
      }
      if (posicion == "32") {
        setPosicionElegida(posiciones['posicion-27'].cantidad)
        setNames(posiciones[`posicion-27`].names)
      }
      if (posicion == "33") {
        setPosicionElegida(posiciones['posicion-20'].cantidad)
        setNames(posiciones[`posicion-20`].names)
      }
      if (posicion == "34") {
        setPosicionElegida(posiciones['posicion-13'].cantidad)
        setNames(posiciones[`posicion-13`].names)
      }
      if (posicion == "35") {
        setPosicionElegida(posiciones['posicion-6'].cantidad)
        setNames(posiciones[`posicion-6`].names)
      }
    }
    catch (e) {
      console.log(e)
      setError(true)
      setNames(["No hay Nombres"])
      setPosicionElegida(0)
    }
  }
  console.log("names", names)
  return (
    <>
      <App />
      <div className="text-center mt-32 text-black">
        <h2 className="text-2xl font-bold">Estadisticas</h2>
        <p className="text-lg">Estan son las estadisticas de todas las partidas promediadas</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => setModal(true)}>
          ¿Que se promedia?
        </button>
        <button onClick={() => promediarJugadores()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-5">Promediar</button>
        <button onClick={() => setCirculosMostrar(!circulosMostrar)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-5">{circulosMostrar ? "Ocultar Circulos" : "Mostrar Circulos"}</button>
      </div>
      {modal && <ModalPromedio modal={modal} setModal={setModal} />}
      <Board mostrarPoints={false} pointsArray={pointsArray} estadisticas={estadisticas} error={error} circulosMostrar={circulosMostrar} names={names} puntaje={jugadores?.map((jugador) => jugador.puntaje).reduce((anterior, actual) => anterior + actual / jugadores.length, 0) || 0} posicionElegida={posicionElegida} circles={circlesList} pri_param={-1000} PosicionesCantidad={posiciones} PedirInfoCantidadPosiciones={PedirInfoCantidadPosiciones} seg_param={500} ter_param={1000} cuar_param={1500} qui_param={5000} points={true} vivo={false} />
    </>
  )
}

export default BoardEstadisticas
