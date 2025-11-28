import React, { useState, useRef } from 'react';
import { FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { createElement } from '../logic/createElement';
import { Load } from './modals/modals';
import { useEffect } from 'react';
// import CircleCursorFollow from './decoration/CircleCursorFollow'; ==> // imports without use
import BoardGamePoints from './boards/BoardGamePoints/BoardGamePoints';
import BoardGameLen from './boards/BoardGameLen/BoardGameLen';
import { PlayerIdCounter } from '../logic/createElement';
// import SelectGame from './selectgame/selectGame';                     ==>      // imports without use
// import BeautifulCard from './selectgame/cardSelectGame/cardSelectOption'; ==> // imports without use
import BoardGameNull from './boards/BoardNull/BoardGameNull';
// import { SelectGameFunction } from '../logic/createElement';
import './BeautifulCard.css'

const BeautifulForm = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsgCamera, setErrorMsg] = useState("");

  // const [modificationGame, setModificationGame] = useState(false);

  const [Target, setTarget] = useState(false);

  const [hiddenLoad, setHiddenLoad] = useState(true)

  const [hiddenLoadSure, setHiddenLoadSure] = useState(true)

  const [hiddenError, setHiddenError] = useState(true)

  const [hiddenfinishWeb, setHiddenFinishWeb] = useState(true)


  // const [hiddenfinishCellphone, setHiddenFinishCellphone] = useState(true) ==> // states in disuse

  const [detec, setDetecFinish] = useState(true)

  const [camera, setHiddenCamera] = useState(true)

  const [cellphone, setHiddenCellphone] = useState(true)
  const [cellphoneError, setHiddenCellphoneError] = useState(true)      // stastes in disuse

  const [process, setProcess] = useState('');
  const [functions, setFunctions] = useState('');
  const [video, setHiddenVideo] = useState(true)
  const [tiempo, setTiempo] = useState(0);
  const [tiempoEjecucion, setTiempoEjecucion] = useState(0);
  const [tiempoSubida, setTiempoSubida] = useState(0);
  const [cameraStream, setCameraStream] = useState(null);
  // const [startWebCamera, setStartWebCamera] = useState(false);  ==> // I have no idea for this state
  const HideErrorActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenError ? "hidden" : ""}`
  const hideLoadActiveSure = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoadSure ? "hidden" : ""}`
  const hideLoadActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenLoad ? "hidden" : ""}`
  const hiddenfinishActiveWeb = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${hiddenfinishWeb ? "hidden" : ""}`
  const hiddenDetecActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${detec ? "hidden" : ""}`
  const hiddenCameraActive = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${camera ? "hidden" : ""}`
  // const hiddenfinishActiveCellphone = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${cellphone ? "hidden" : ""}`           ==> // this const or styles is not in use because the cellphone camera mode is disabled
  const hiddenfinishErrorCellphone = `fixed inset-0 flex items-center justify-center bg-transparent z-50 ${cellphoneError ? "hidden" : ""}`
  const videoStyle = `bg-transparent h-auto w-76 rounded-2xl border-2 bg-gray-600 ${video ? "hidden" : ""}`;

  const nameLocal = localStorage.getItem("name")
  const videoRefWeb = useRef(null);
  // const videoRefCellphone = useRef(null); ==> // this ref is not in use because the cellphone camera mode is disabled

  function PermiCamera() {
    async function CameraFunction() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        setHiddenCellphoneError(true)
        setHiddenFinishWeb(false)
        setCameraStream(stream); // guardamos el stream
        console.log("Stream de cámara obtenido:", stream);
        console.log(videoRefWeb.current);
        if (videoRefWeb.current) {
          videoRefWeb.current.srcObject = stream;
          console.log("Cámara iniciada correctamente");
        }
      } catch (err) {
        console.log("Error al acceder a la cámara:", err);
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
        setHiddenFinishWeb(true)
      }
    }
    CameraFunction()
  }
  function StopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      console.log("Cámara detenida");

      if (videoRefWeb.current) {
        videoRefWeb.current.srcObject = null;
      }

      setCameraStream(null);
    }
  }
  // function PermiCameraCellphone(){
  //   setHiddenVideo(false)
  //   PermiCamera()                       ==> // This function was used for used the camera cellphone
  //   setHiddenCellphone(false)
  // }
  // async function guardarDatosEnBackendWithCellphone() {
  //   const datos = {
  //         name : localStorage.getItem('name'),
  //         id : localStorage.getItem('playerIdCounter'),
  //         TypeCamera : "Cellphone",                                        ==> // This function was used for send data to backend with cellphone image
  //         TypeGame : localStorage.getItem('TypeGame'),
  //         data_image: localStorage.getItem('data_text_image'),
  //
  //   };
  //     console.log(`Estos son los ${datos}`);
  //     try{
  //         setHiddenLoad(!hiddenLoad)
  //         const response = await fetch("http://localhost:5000/guardar", 
  //           {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(datos),  // Envía el objeto completo
  //     })
  //     if (!response.ok) throw new Error("❌ Falló el guardado");
  //     else {}
  //       setHiddenLoad(true)
  //       setDetecFinish(!hiddenDetecActive)
  //     } catch (error){
  //         localStorage.setItem("error",error)
  //         setHiddenLoad(true)
  //         setHiddenError(!HideErrorActive)
  //         console.log(error)
  //     }

  // }
  // function CapturarImagen() {
  //       if (!videoRefCellphone.current) return;

  //       const canvas = document.createElement("canvas");
  //       const video = videoRefCellphone.current;

  //       // tamaño del canvas igual al del video
  //       canvas.width = video.videoWidth;                        ==> // This function was used for capture image from cellphone camera with a canvas powered by button
  //       canvas.height = video.videoHeight;

  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //       // obtiene el string base64
  //       const dataUrl = canvas.toDataURL("image/webp");
  //       const data_url_python = dataUrl.split(",")[1]
  //       localStorage.setItem("data_text_image",data_url_python)
  //       console.log("Imagen en base64:", data_url_python); // podés usarla o enviarla a un backend
  //       setHiddenCellphone(!cellphone)
  //     }
  // function PermiCameraModal(){
  //     setHiddenCamera(!camera)
  // }
  // function TypeGame(){
  //   let Instrument = "No hay instrumento"
  //   if(localStorage.getItem("TypeGame") == "Metrologia"){
  //     Instrument = { instrumento: "Elegi" };
  //     return Instrument
  //   }
  //   else{
  //       Instrument = { instrumento: "No eligas" };
  //       return Instrument
  //   }

  // }
  // async function InstrumentSelect(){
  //   try{
  //     const tryInstrument = TypeGame()
  //     const response = await fetch("http://127.0.0.1:5000/instruments", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(tryInstrument),
  //     })
  //     if (!response.ok) throw new Error("❌ Falló el guardado");
  //     else {}
  //       const result = await response.json();
  //       console.log(result.instrumento)
  //       console.log(result)
  //       if(result.instrumento == null){
  //         localStorage.setItem("instrument_selected", "")
  //       }else{
  //       localStorage.setItem("instrument_selected",result.instrumento)}
  //   }
  //   catch (error){
  //       console.log("No anda", error)
  //     }

  // }
  // function PermiCameraModalWeb(){
  //     setHiddenVideo(false)
  //     PermiCamera()
  //     setHiddenFinishWeb(false)
  //     InstrumentSelect()
  // }
  async function guardarDatosEnBackendWithWeb() {
    const inicio = Date.now();
    const datos = {
      name: localStorage.getItem('name'),
      id: localStorage.getItem('playerIdCounter'),
      // TypeCamera : 'WebCam',  ==> This function was used for say to backend that the camera used is web.
      // TypeGame : localStorage.getItem('TypeGame'),
      // data_image : "",        ==> This function was used for send data to backend with web image, but now the backend capture the image directly from the python server
      //                             also data_image it was to prevent errors in the backend, such as NoneType or flask error 500.
      // instrument_selected : localStorage.getItem('instrument_selected')   ==> This function is not used because the mode metrology is disabled.

    };
    console.log(datos);
    try {
      setHiddenLoad(!hiddenLoad)
      const response = await fetch("http://localhost:5000/guardar", {
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
    PermiCamera()
    setHiddenVideo(false)
    // selectCamera()     ==> // This function was used for show the camera process 
    setHiddenLoadSure(!hiddenLoadSure)
    setHiddenFinishWeb(false)
    PlayerIdCounter()




  }
  const buttonHiddenFinishWeb = () => {
    StopCamera()
    setHiddenFinishWeb(true)
    // setProcess("Llamada al Servidor para ejecutar funciòn de detecciòn de fichas")   ==> There are no processes to show
    // setFunctions("4to Web") 
    guardarDatosEnBackendWithWeb()
  }
  const buttonHiddenCancelFinishWeb = () => {
    StopCamera()
    setHiddenFinishWeb(true)

  }
  const buttonHiddenLoadCancel = () => {
    setHiddenLoadSure(true)
  }

  // const buttonHiddenFinishCellphone = () => {
  //   setHiddenFinishCellphone(!hiddenfinishCellphone)
  //   CapturarImagen()
  //   guardarDatosEnBackendWithCellphone()                                   ==> // This function was used for finish the cellphone camera process,fetch to backend and realize the camera capture
  //   videoRefWeb.current.srcObject.getTracks().forEach(track => track.stop());
  //   videoRefWeb.current.srcObject = null;
  //   videoRefWeb.current = null;
  // }
  const buttonHiddenCancelFinishCellphone = () => {
    StopCamera()
    setHiddenCellphone(true)
    setHiddenCellphoneError(true)
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
    // localStorage.setItem('Process', 'Confirmaciòn de nombre')
    // processConfirmName()
  }

  const writingName = (e) => {
    setName(e.target.value)
  }
  // const processWritingName = () => {
  //   setProcess("Escribiendo su nombre")
  //   setFunctions("FirstProcess")
  // }
  // const processConfirmName = () => {
  //   setProcess("Confirmar Nombre")
  //   setFunctions("SecondProcess")
  // }
  // const selectCamera = () => {
  //   setProcess("Seleccionar Camara")

  // }
  // const selectWebCamera = () => {
  //   setProcess("Camara del servidor seleccionada")
  //   setFunctions("ThirdWebProcess")
  // }
  // const selectCellphoneCamera = () => {
  //     setProcess("Camara del dispositivo seleccionada")
  //     setFunctions("ThirdCellphoneProcess")
  // }
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
              // onFocus={processWritingName}
              className="w-full px-5 py-4 text-lg rounded-xl border-2 transition-all text-black duration-300 focus:outline-none focus:ring-4"
              placeholder="Escribe tu nombre aquí..."
            />
            <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-300 text-black" />
          </div>
          {/* <div className='flex flex-col justify-center '>
          <SelectGame modificationGameParam={modificationGame} setModificationGameParam={setModificationGame} />
          <p className='text-center text-black font-bold py-6'>Estas jugando el modo {localStorage.getItem('TypeGame')}</p>
        </div> */}
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
            {/* <BeautifulCard modificationGameParam={modificationGame} setModificationGameParam={setModificationGame} /> */}
          </div>
          <div className={hiddenfinishActiveWeb}>
            <div className="flex flex-col w-96 h-auto bg-white text-black rounded-xl p-10 gap-5">
              <p className="text-center text-3xl font-black">Empieze a jugar</p>
              <video ref={videoRefWeb}
                autoPlay
                playsInline
                controls
                poster='./tenor.gif'
                className={videoStyle}></video>
              {!videoRefWeb.current && <p className="text-center font-bold">Cámara activa</p>}
              <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
              <p className="text-center font-bold">Al dar por terminado su intento haga click en Terminar intento</p>
              {/* {localStorage.getItem("instrument_selected") && <p className='text-center font-bold'> Su instrumento a atinar es {localStorage.getItem("instrument_selected")}</p>} */}
              {/* The top line is disabled because dont exist instument */}
              <button id="cancelButton" onClick={buttonHiddenFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
              <button id="cancelButton" onClick={buttonHiddenCancelFinishWeb} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
            </div>

          </div>
          {/* <div className={hiddenfinishActiveCellphone}>
                      <div className="flex flex-col w-96 h-auto bg-white text-black rounded-xl p-10 gap-5">
                          <p className="text-center text-3xl font-black">Empieze a jugar</p>
                          <video ref={videoRefCellphone}
                                autoPlay
                                playsInline
                                className={videoStyle}></video>
                          <p className="text-center font-bold">El numero de intento hasta ahora es {localStorage.getItem('playerIdCounter')}</p>
                          <p className="text-center font-bold">Al dar por terminado su intento celular haga click en Terminar intento</p>
                          <button id="cancelButton" onClick={buttonHiddenFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Terminar intento N°{localStorage.getItem('playerIdCounter')} </button>
                          <button id="cancelButton" onClick={buttonHiddenCancelFinishCellphone} class="overflow-hidden group px-6 py-6 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
                      </div>
          </div> */}
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
            tiempoDeEspera={tiempo}
            tiempoDeFuncion={tiempoEjecucion}
            tiempoDeSubida={tiempoSubida}
          // PermiCameraParam={PermiCameraCellphone}        ==> // This prop was used for cellphone camera permission
          // PermiCameraWebParam={PermiCameraModalWeb}        ==> // This prop was used for web camera permission, that is still used but with another button
          ></Load>
        </div>
      </div>
      {true && <BoardGamePoints ProcessParam={process} FunctionsParam={functions} />}
      {/* {localStorage.getItem("TypeGame") == "Metrologia" && <BoardGameLen ProcessParamMet={process} FunctionsParamMet={functions} /> }
       {localStorage.getItem("TypeGame") == "" && <BoardGameNull /> } */}
    </div>


  );
};

export default BeautifulForm;
