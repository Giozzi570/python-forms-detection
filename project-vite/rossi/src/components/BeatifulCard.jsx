import React, { useState } from 'react';
import { FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { createElement } from '../logic/createElement';
import { Load } from './modals/modals';
import { useEffect } from 'react';
import { useRef } from 'react';
import CircleCursorFollow from './decoration/CircleCursorFollow';
import BoardGamePoints from './boards/BoardGamePoints/BoardGamePoints';
import BoardGameLen from './boards/BoardGameLen/BoardGameLen';
import { PlayerIdCounter } from '../logic/createElement';
import SelectGame from './selectgame/selectGame';
import BeautifulCard from './selectgame/cardSelectGame/cardSelectOption';
import BoardGameNull from './boards/BoardNull/BoardGameNull';
import { SelectGameFunction } from '../logic/createElement';
import './BeatifulCard.css'

const BeautifulForm = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [modificationGame, setModificationGame] = useState(false);

  const [Target, setTarget] = useState(false);

  const [hiddenLoad, setHiddenLoad] = useState(true)

  const [hiddenLoadSure, setHiddenLoadSure] = useState(true)

  const [hiddenError, setHiddenError] = useState(true)

  const [hiddenfinishWeb, setHiddenFinishWeb] = useState(true)

  
  const [hiddenfinishCellphone, setHiddenFinishCellphone] = useState(true)

  const [detec,setDetecFinish] = useState(true)

  const [camera,setHiddenCamera] = useState(true)
  
  const [cellphone,setHiddenCellphone] = useState(true)

  const HideErrorActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenError ? "hidden" : ""}`
  const hideLoadActiveSure = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoadSure ? "hidden" : ""}`
  const hideLoadActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoad ? "hidden" : ""}`
  const hiddenfinishActiveWeb = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenfinishWeb ? "hidden" : ""}`
  const hiddenDetecActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${detec ? "hidden" : ""}`
  const hiddenCameraActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${camera ? "hidden" : ""}`
  const hiddenfinishActiveCellphone = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${cellphone ? "hidden" : ""}`

  const nameLocal = localStorage.getItem("name")
  const videoRef = useRef(null); // referencia al <video>

  async function PermiCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video : {facingMode: "environment"}, audio : false});
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // asigna el stream
      }
    } catch (err) {
      console.error("Error al abrir la cámara:", err);
    }finally{
      setHiddenCamera(false)
    }
   setHiddenCamera(true)
   setHiddenCellphone(false)
    console.log("no tengo camara xd")
  }
  function PermiCameraWeb(){
    setHiddenCamera(true)
  }
  async function guardarDatosEnBackendWithCellphone() {
    const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter'),
        TypeCamera : "Cellphone",
        TypeGame : localStorage.getItem('TypeGame'),
        
    };
    console.log(datos);
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("https://backend-saud.onrender.com/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
    })
    if (!response.ok) throw new Error("❌ Falló el guardado");
    else {}
      setHiddenLoad(true)
      setDetecFinish(!hiddenDetecActive)
    } catch (error){
        localStorage.setItem("error",error)
        setHiddenLoad(true)
        setHiddenError(!HideErrorActive)
        console.log(error)
    }

}
  async function guardarDatosEnBackendWithWeb() {
    const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter'),
        TypeCamera : 'WebCam',
        TypeGame : localStorage.getItem('TypeGame')
    };
    console.log(datos);
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("http://127.0.0.1:5000/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
    })
    if (!response.ok) throw new Error("❌ Falló el guardado");
    else {}
      setHiddenLoad(true)
      setDetecFinish(!hiddenDetecActive)
    } catch (error){
        localStorage.setItem("error",error)
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
    setHiddenFinishWeb(!hiddenfinishWeb)
    setHiddenLoadSure(!hiddenLoadSure)
    PlayerIdCounter()
  
 
    
  }
  const buttonHiddenFinishWeb = () => {
    setHiddenFinishWeb(!hiddenfinishWeb)
    guardarDatosEnBackendWithWeb()
  }
  const buttonHiddenCancelFinishWeb = () => {
    setHiddenFinishWeb(true)
  }
  const buttonHiddenLoadCancel = () => {
    setHiddenLoadSure(true)
  }

   const buttonHiddenFinishCellphone = () => {
    setHiddenFinishCellphone(!hiddenfinishCellphone)
    guardarDatosEnBackendWithCellphone()
  }
  const buttonHiddenCancelFinishCellphone = () => {
    setHiddenFinishWebCellhone(true)
  }
  
  function functionFetch(name,bool,target,hiddenLoadSure,camara){
    createElement(name)
    setSubmitted(bool);
    setTarget(!target)
    setHiddenCamera(!camara)
    setHiddenLoadSure(!hiddenLoadSure)
    setTimeout(() => {
      setSubmitted(false);
      setName('');
    }, 1000);
  }

  const handleSubmit = () => {
    if (!name.trim()) return;
    functionFetch(name,true,Target,hiddenLoadSure,camera)
  }
  
  const buttonBase =
    'w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95';
  const buttonColors = submitted
    ? 'bg-emerald-600'
    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600';

  return (
    <div className="lg:min-h-screen h-auto w-full flex lg:flex-row flex-col items-center justify-around from-gray-50 to-gray-200 p-4 " id='BeatifulCard'>
      <div className="relative w-full flex flex-col max-w-md h-screen justify-center grow">
        <div className='bg-white backdrop-blur-lg bg-opacity-30 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-8">
          Ingresa tu Nombre
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 text-lg rounded-xl border-2 transition-all text-black duration-300 focus:outline-none focus:ring-4"
            placeholder="Escribe tu nombre aquí..."
          />
          <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-300 text-black" />
        </div>
        <div className='flex flex-col justify-center '>
          <SelectGame modificationGameParam={modificationGame} setModificationGameParam={setModificationGame} />
          <p className='text-center text-black font-bold py-6'>Estas jugando el modo {localStorage.getItem('TypeGame')}</p>
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
                    <BeautifulCard modificationGameParam={modificationGame} setModificationGameParam={setModificationGame} />
                </div>
                <div className={hiddenfinishActiveWeb}>
                      <div className="flex flex-col w-96 h-96 bg-white text-black rounded-xl p-10 gap-5">
                          <p className="text-center text-3xl font-black">Empieze a jugar</p>
                          <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
                          <p className="text-center font-bold">Al dar por terminado su intento haga click en Terminar intento</p>
                          <button id="cancelButton" onClick={buttonHiddenFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
                          <button id="cancelButton" onClick={buttonHiddenCancelFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
                      </div>
        
          </div>
          <div className={hiddenfinishActiveCellphone}>
                      <div className="flex flex-col w-96 h-auto bg-white text-black rounded-xl p-10 gap-5">
                          <p className="text-center text-3xl font-black">Empieze a jugar</p>
                          <p className="text-center text-3xl font-black">Ubique su telefono para empezar a jugar</p>
                          <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
                          <p className="text-center font-bold">Al dar por terminado su intento haga click en Terminar intento</p>
                          <button id="cancelButton" onClick={buttonHiddenFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
                          <button id="cancelButton" onClick={buttonHiddenCancelFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
                      </div>
          </div>
          <Load hideLoadActiveSureParam={hideLoadActiveSure}
              buttonHiddenLoadParam={buttonHiddenLoad}
              buttonHiddenLoadCancelParam={buttonHiddenLoadCancel}
              hideLoadActiveParam={hideLoadActive}
              nameLocalParam={nameLocal}
              HideErrorActiveParam={HideErrorActive}
              setHiddenErrorParam={buttonHiddenError}
              setHiddenDetecParam={setDetecFinish}
              hiddenDetecActiveParam={hiddenDetecActive}
              HiddenCameraParam={hiddenCameraActive}
              PermiCameraParam={PermiCamera}
              PermiCameraWebParam={PermiCameraWeb}></Load>
      </div>
        </div>
       {localStorage.getItem("TypeGame") == "Puntuacion" && <BoardGamePoints/> }
       {localStorage.getItem("TypeGame") == "Metrologia" && <BoardGameLen/> }
       {localStorage.getItem("TypeGame") == "" && <BoardGameNull /> }
</div>


  );
};

export default BeautifulForm;
