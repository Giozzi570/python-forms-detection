import { useEffect, useState } from "react";
import Board from "../components/boards/Board";
function App() {
  const [datos, setDatos] = useState([])
  const circles = datos.map((circle) => {
    return <div className={`w-[55px] h-[55px] bg-yellow-500 border-4 border-black rounded-full absolute`} style={{ top: `${-(circle[0] + 15) + (84 + 468)}px`, left: `${circle[1] - 78 - 15}px` }} key={circle}></div>
  })
  const [medidas,setMedidas] = useState(false)
  const [puntaje, setPuntaje] = useState(0);
  const [ids, setIds] = useState([]);
  const [actualizado, setActualizado] = useState("");
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActualizado("Actualizando...")
  //     fetch("http://localhost:5000/recibir", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({"Query": "pedime_puntaje"})
  //     })
  //       .then(res => res.json())
  //       .then((data) => {
  //         setPuntaje(data.puntaje);
  //         setIds(data.ids);
  //         setDatos(data.datos_circulos)
  //         setActualizado("Actualizado")
  //       })
  //   }, 3000);

  //   return () => clearInterval(interval); // evita el doble intervalo
  // }, []);
  function sumarPuntaje(puntaje) {
    let puntajeTotal = 0;
    for (let i = 0; i < puntaje.length; i++) {
      puntajeTotal += puntaje[i];
    }
    return puntajeTotal;
  }
  const [modals, SetModal] = useState([])
  const [points, setPoints] = useState(true)
  const [ProcessShow, setProcessShow] = useState("")
  const [modal, setModal] = useState("")
  const modalName = (name) => {
    setModal(name)
    console.log(name)

  }
  // Generar un array de 35 números incrementales comenzando desde 1
  const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1>Puntaje en vivo</h1>
      <p>{actualizado}</p>
      <p>puntaje: {sumarPuntaje(puntaje)}</p>
      <p>IDs: {ids.join(", ")}</p>
      <Board setPoints={setPoints} medidas={medidas} circles={<div onClick={()=>setMedidas(!medidas)} className="w-[55px] cursor-pointer h-[55px] bg-yellow-500 border-4 border-black rounded-full absolute" style={{ top: "15px", left: "15px" }}></div>} pointsArray={pointsArray} points={points} pri_param={-1000} seg_param={500} ter_param={1000} cuar_param={1500} qui_param={5000} mode={" puntos"}></Board>
    </div>
  );
}

export default App;
