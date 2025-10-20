import React, { useState,useRef } from 'react';
import { FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { createElement } from '../logic/createElement';
import { Load } from './modals/modals';
import { useEffect } from 'react';
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
  const [errorMsgCamera, setErrorMsg] = useState("");

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
  const [cellphoneError,setHiddenCellphoneError] = useState(true)
  
  const [process, setProcess] = useState('');
  const [functions, setFunctions] = useState('');
  const [video, setHiddenVideo] = useState(true)

  const HideErrorActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenError ? "hidden" : ""}`
  const hideLoadActiveSure = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoadSure ? "hidden" : ""}`
  const hideLoadActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoad ? "hidden" : ""}`
  const hiddenfinishActiveWeb = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenfinishWeb ? "hidden" : ""}`
  const hiddenDetecActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${detec ? "hidden" : ""}`
  const hiddenCameraActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${camera ? "hidden" : ""}`
  const hiddenfinishActiveCellphone = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${cellphone ? "hidden" : ""}`
  const hiddenfinishErrorCellphone = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${cellphoneError ? "hidden" : ""}`
  const videoStyle = `bg-transparent h-auto w-76 rounded-2xl  border-2 ${video ? "hidden" : ""}`;



  const nameLocal = localStorage.getItem("name")
  const videoRef = useRef(null); // referencia al <video>

  function PermiCamera() {
    selectCellphoneCamera()
    PermiCameraModal()
    async function CameraFunction() {
      try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        setHiddenVideo(false)
        setHiddenCellphone(false)
        setHiddenCellphoneError(true)
        let Track = stream.getVideoTracks()[0]
        Track.addEventListener("ended",() => {
          CameraFunction()
          setHiddenCellphone(true)
      })
      }
    } catch (err) {
        let message = "";
      switch (err.name) {
        case "NotAllowedError":
          message = "Permiso denegado para usar la cámara.";
          break;
        case "NotFoundError":
          message = "No se encontró ninguna cámara.";
          break;
        case "NotReadableError":
          message = "La cámara está siendo usada por otra aplicación.";
          break;
        case "OverconstrainedError":
          message = "La configuración de video no es compatible con tu dispositivo.";
          break;
        case "SecurityError":
          message = "Debe ejecutarse en un sitio seguro (https o localhost).";
          break;
        default:
          message = "Error desconocido al acceder a la cámara.";
      }
      setErrorMsg(message);
      setHiddenCellphoneError(false)
      setHiddenLoad(true)
    }
    }
    CameraFunction()
  }


async function guardarDatosEnBackendWithCellphone() {
  const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter'),
        TypeCamera : "Cellphone",
        TypeGame : localStorage.getItem('TypeGame'),
        data_image: localStorage.getItem('data_text_image')
        
  };
    console.log(`Estos son los ${datos}`);
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("https://deana-inspirable-weirdly.ngrok-free.dev/guardar", 
          {
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
function CapturarImagen() {
      if (!videoRef.current) return;
  
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
  
      // tamaño del canvas igual al del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // obtiene el string base64
      const dataUrl = canvas.toDataURL("image/webp");
      const data_url_python = dataUrl.split(",")[1]
      localStorage.setItem("data_text_image",data_url_python)
      console.log("Imagen en base64:", data_url_python); // podés usarla o enviarla a un backend
      setHiddenCellphone(!cellphone)
    }
function PermiCameraModal(){
    setHiddenCamera(!camera)
}
function PermiCameraModalWeb(){
  setHiddenCamera(!camera)
  setHiddenFinishWeb(!hiddenfinishWeb)
  selectWebCamera()
}
async function guardarDatosEnBackendWithWeb() {
    const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter'),
        TypeCamera : 'WebCam',
        TypeGame : localStorage.getItem('TypeGame'),
        data_image : ""
        
    };
    console.log(datos);
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("https://deana-inspirable-weirdly.ngrok-free.dev/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
    })
    if (!response.ok) throw new Error("❌ Falló el guardado");
    else {}
      const result = await response.json();
      localStorage.setItem("puntaje", result.Datos.puntaje);
      setHiddenLoad(true)
      setDetecFinish(!hiddenDetecActive)
    } catch (error){
         if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
    error.message = "❌ No se pudo conectar al servidor";
  }
  localStorage.setItem("error",error.message)
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
    selectCamera()
    setHiddenLoadSure(!hiddenLoadSure)
    PermiCameraModal()
    PlayerIdCounter()

  
 
    
  }
  const buttonHiddenFinishWeb = () => {
    setProcess("Llamada al Servidor para ejecutar funciòn de detecciòn de fichas")
    setFunctions("4to Web")
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
    CapturarImagen()
    guardarDatosEnBackendWithCellphone()
  }
  const buttonHiddenCancelFinishCellphone = () => {
    setHiddenCellphone(true)
  }
  
  function functionFetch(name,bool,target,hiddenLoadSure){
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
    functionFetch(name,true,Target,hiddenLoadSure)
    localStorage.setItem('Process', 'Confirmaciòn de nombre')
    processConfirmName()
  }

  const writingName = (e) => {
    setName(e.target.value)
  }
  const processWritingName = () => {
    setProcess("Escribiendo su nombre")
    setFunctions("FirstProcess")
  }
  const processConfirmName = () => {
    setProcess("Confirmar Nombre")
    setFunctions("SecondProcess")
  }
  const selectCamera = () => {
    setProcess("Seleccionar Camara")
    
  }
  const selectWebCamera = () => {
    setProcess("Camara del servidor seleccionada")
    setFunctions("ThirdWebProcess")
  }
  const selectCellphoneCamera = () => {
      setProcess("Camara del dispositivo seleccionada")
      setFunctions("ThirdCellphoneProcess")
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
            onFocus={processWritingName}
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
                          <video ref={videoRef}
                                autoPlay
                                playsInline
                                className={videoStyle}></video>
                          <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
                          <p className="text-center font-bold">Al dar por terminado su intento haga click en Terminar intento</p>
                          <button id="cancelButton" onClick={buttonHiddenFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
                          <button id="cancelButton" onClick={buttonHiddenCancelFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
                      </div>
          </div>
          <div className={hiddenfinishErrorCellphone}>
                      <div className="flex flex-col w-96 h-auto bg-white text-black rounded-xl p-10 gap-5">
                          <p className="text-center text-3xl font-black">Hubo un error al conectarse con su camara</p>
                          <p className="text-center text-3xl font-black">{errorMsgCamera}</p>
                          <button id="cancelButton" onClick={PermiCamera} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Volver a intentar </button>
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
              PermiCameraWebParam={PermiCameraModalWeb}
              ></Load>
      </div>
        </div>
       {localStorage.getItem("TypeGame") == "Puntuacion" && <BoardGamePoints ProcessParam={process} FunctionsParam={functions} videoRefParam={videoRef} videoStyleParam={videoStyle} /> }
       {localStorage.getItem("TypeGame") == "Metrologia" && <BoardGameLen/> }
       {localStorage.getItem("TypeGame") == "" && <BoardGameNull /> }
</div>


  );
};

export default BeautifulForm;
