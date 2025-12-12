import React, { useState } from 'react';
import { FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { createElement } from '../logic/createElement';
import { Load } from '../components/modals/modals';
import { useEffect } from 'react';
import Board from '../components/boards/Board';
import { PlayerIdCounter } from '../logic/createElement';
import './BeautifulCard.css'

const SinInternet = () => {
  const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);
  const [datos, setDatos] = useState([])
  const [circulos, setCirculos] = useState()
  const circlesList = []
  const [Id, setId] = useState()
  const [PuntajeCircle, setPuntajeCircle] = useState()
  const [colorCircle, setColorCircle] = useState()
  const circles = circulos?.map((circle) => {

    console.log("circle", circle)
    for (let i = 0; i < circle.datos_circulos.length; i++) {
      const [x, y, r] = circle.datos_circulos[i]
      const id = circle.ids[i]
      const puntaje = circle.puntaje[i]
      const color = circle.color[i]

      const circleData = [x, y, id, puntaje, color, r]

      circlesList.push(circleData)
    }
    return circlesList

  })

  const [posicionX, setPosicionX] = useState()
  const [posicionY, setPosicionY] = useState()
  const [radio, setRadio] = useState()
  const [medidas, setMedidas] = useState(false)
  const [puntaje, setPuntaje] = useState([]);
  const [ids, setIds] = useState([]);
  const [actualizado, setActualizado] = useState("");
  const [points, setPoints] = useState(true)
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [Target, setTarget] = useState(false);

  const [hiddenLoad, setHiddenLoad] = useState(true)

  const [hiddenLoadSure, setHiddenLoadSure] = useState(true)

  const [hiddenError, setHiddenError] = useState(true)

  const [hiddenfinishWeb, setHiddenFinishWeb] = useState(true)

  const [detec, setDetecFinish] = useState(true)

  const [detecFichas, setDetecFichas] = useState(false)
  const [tiempo, setTiempo] = useState(0);
  const [tiempoEjecucion, setTiempoEjecucion] = useState(0);
  const [tiempoSubida, setTiempoSubida] = useState(0);
  const HideErrorActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenError ? "hidden" : ""}`
  const hideLoadActiveSure = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoadSure ? "hidden" : ""}`
  const hideLoadActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoad ? "hidden" : ""}`
  const hiddenfinishActiveWeb = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenfinishWeb ? "hidden" : ""}`
  const hiddenDetecActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${detec ? "hidden" : ""}`

  const nameLocal = localStorage.getItem("name")

  function medidasEvent(e) {
    setPosicionX(e[1] - 78 - 15 + 22)
    setPosicionY(-(e[0] + 15) + (84 + 468) + 22)
  }
  function handleInfo(e) {
    setId(e[2])
    setPuntajeCircle(e[3])
    setRadio(e[5])
  }
  function circleInfo(e) {
    console.log("e", e)
    setMedidas(true)
    medidasEvent(e)
    handleInfo(e)
    setColorCircle(e[4])
  }

  useEffect(() => {
    if (!detecFichas) {
      console.log("No se detectaron fichas")
      return () => { }
    };
    const interval = setInterval(() => {
      console.log(detecFichas)
      setActualizado("Actualizando...")
      fetch("http://localhost:5000/recibir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "Query": "pedime_puntaje" })
      })
        .then(res => res.json())
        .then((data) => {
          for (let i = 0; i < data.datos_circulos.length; i++) {
            let circulo = data.datos_circulos[i]
            let puntaje = data.puntaje[i]
            let ids = data.ids[i]
            let json = { "puntaje": puntaje, "ids": ids, "datos_circulos": circulo }
            console.log("ESTO ES " + json["datos_circulos"][0])
          }
          setPuntaje(data.puntaje);
          setIds(data.ids);
          setDatos(data.datos_circulos)
          setActualizado("Actualizado")
          setCirculos([data])
        })
    }, 3000);

    return () => clearInterval(interval); // evita el doble intervalo
  }, [detecFichas]);

  async function guardarDatosEnBackendWithWeb() {
    const inicio = Date.now();
    const datos = {
      name: localStorage.getItem('name'),
      id: localStorage.getItem('playerIdCounter'),
    };
    console.log(datos);
    try {
      setHiddenLoad(!hiddenLoad)
      const response = await fetch("http://localhost:5000/SinInternet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
      })
      if (!response.ok) throw new Error("❌ Falló el guardado");
      else { }
      const result = await response.json();
      localStorage.setItem("puntaje", result.Datos.puntaje);
      setHiddenLoad(true)
      setDetecFinish(!hiddenDetecActive)
      const final = Date.now();
      setTiempo(final - inicio);
      console.log("Tiempo total de espera:", final - inicio, "ms");
      setTiempoEjecucion(result.Datos.Tiempo_de_ejecucion);
      setTiempoSubida(result.Datos.Tiempo_de_subida);
    } catch (error) {
      if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
        error.message = "❌ No se pudo conectar al servidor";
      }
      localStorage.setItem("error", error.message)
      setHiddenLoad(true)
      setHiddenError(!HideErrorActive)
      console.log(error)
    }

  }
  const buttonHiddenError = () => {
    setHiddenError(!hiddenError)
    localStorage.removeItem("error")
  }
  const buttonHiddenLoad = () => {
    setHiddenLoadSure(!hiddenLoadSure)
    setHiddenFinishWeb(false)
    PlayerIdCounter()
    setDetecFichas(true)
  }
  const buttonHiddenFinishWeb = () => {
    setDetecFichas(false)
    setHiddenFinishWeb(true)
    guardarDatosEnBackendWithWeb()
  }
  const buttonHiddenCancelFinishWeb = () => {
    setHiddenFinishWeb(true)
    setDetecFichas(false)

  }
  const buttonHiddenLoadCancel = () => {
    setHiddenLoadSure(true)
  }
  function sumarPuntaje(puntaje) {
    let puntajeTotal = 0;
    for (let i = 0; i < puntaje.length; i++) {
      puntajeTotal += puntaje[i];
    }
    return puntajeTotal;
  }
  function FinishAndReset() {
    setDetecFinish(true)
    setCirculos([])
  }
  function functionFetch(name, bool, target, hiddenLoadSure) {
    createElement(name)
    setSubmitted(bool);
    setTarget(!target)
    setHiddenLoadSure(!hiddenLoadSure)
    setTimeout(() => {
      setSubmitted(false);
      setName('');
    }, 1000);
  }

  const handleSubmit = () => {
    if (!name.trim()) return;
    functionFetch(name, true, Target, hiddenLoadSure)
  }

  const writingName = (e) => {
    setName(e.target.value)
  }
  const buttonBase =
    'w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95';
  const buttonColors = submitted
    ? 'bg-emerald-600'
    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600';
  return (
    <div className="xl:min-h-screen h-auto w-full flex xl:flex-row flex-col items-center justify-around from-gray-50 to-gray-200 p-4 " id='BeatifulCard'>
      <div className="relative w-full flex flex-col max-w-md h-screen justify-center grow">
        <div className='bg-white backdrop-blur-lg bg-opacity-30 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-8">
            Ingresa tu Nombre
          </h2>

          <div className="relative mb-8">
            <input
              type="text"
              value={name}
              onChange={writingName}
              className="w-full px-5 py-4 text-lg rounded-xl border-2 transition-all text-black duration-300 focus:outline-none focus:ring-4"
              placeholder="Escribe tu nombre aquí..."
            />
            <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-300 text-black" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`${buttonBase} ${buttonColors}`}
          >
            {submitted ? (
              <>
                <FaCheck className="mr-2" /> Enviado!
              </>
            ) : (
              <>
                Enviar <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <div class="max-w-md mx-auto mt-8 p-6 bg-white text-black shadow-lg rounded-xl border flex flex-row gap-10 justify-center border-gray-200" >
            <div id='containerUser' class="flex flex-col items-center text-wrap">
              <h3>Nombre</h3>
              <span>{name}</span>
            </div>
          </div>
          <div className={hiddenfinishActiveWeb}>
            <div className="flex flex-col w-96 h-auto bg-white text-black rounded-xl p-10 gap-5">
              <p className="text-center text-3xl font-black">Empieze a jugar</p>
              <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
              <p className="text-center font-bold">Al dar por terminado su intento haga click en Terminar intento</p>
              <button id="cancelButton" onClick={buttonHiddenFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
              <button id="cancelButton" onClick={buttonHiddenCancelFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
            </div>

          </div>
          <Load hideLoadActiveSureParam={hideLoadActiveSure}
            buttonHiddenLoadParam={buttonHiddenLoad}
            buttonHiddenLoadCancelParam={buttonHiddenLoadCancel}
            hideLoadActiveParam={hideLoadActive}
            nameLocalParam={nameLocal}
            HideErrorActiveParam={HideErrorActive}
            setHiddenErrorParam={buttonHiddenError}
            setHiddenDetecParam={FinishAndReset}
            hiddenDetecActiveParam={hiddenDetecActive}
            tiempoDeEspera={tiempo}
            tiempoDeFuncion={tiempoEjecucion}
            tiempoDeSubida={tiempoSubida}
          ></Load>
        </div>
      </div>
      <Board ids={ids} actualizado={actualizado} mostrarPoints={true} setMedidas={setMedidas} vivo={true} Color={colorCircle} Id={Id} circulosMostrar={true} circlePuntaje={PuntajeCircle} puntaje={sumarPuntaje(puntaje)} pointsArray={pointsArray} setPoints={setPoints} handleInfo={circleInfo} medidas={medidas} posicionX={posicionX} posicionY={posicionY} radio={radio} circles={circlesList} points={points} pri_param={-1000} seg_param={500} ter_param={1000} cuar_param={1500} qui_param={5000} />
    </div>


  );
};

export default SinInternet;
