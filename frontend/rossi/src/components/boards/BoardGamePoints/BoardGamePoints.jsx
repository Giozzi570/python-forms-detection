import React from 'react';
import { useState, useEffect } from 'react';
import './BoardGame.css';
import CodeBlock from '../../funtions/function_writing/functionWriting';
const BoardGamePoints = ({ProcessParam,FunctionsParam,videoRefParam,videoStyleParam}) => {
const [points, setPoints] = useState(false)
const [ProcessShow,setProcessShow] = useState("")
// Generar un array de 35 números incrementales comenzando desde 1
const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);
const selectProcess = (process) => {
        if(process == "FirstProcess"){
            console.log("1er")
            setProcessShow("writingName")
        }else if(process == "SecondProcess"){
            console.log("2do")
            setProcessShow("confirmName")
        }else if(process == "ThirdWebProcess"){
            console.log("3er Web")
            setProcessShow("selectWebCamera")
        }else if(process == "ThirdCellphoneProcess"){
            console.log("3er Cellphone")
            setProcessShow("selectCellphoneCamera")
        } 
    }

useEffect(() => {selectProcess(FunctionsParam)}, [FunctionsParam])


const code = {
        "writingName" : `
import React, { useState } from 'react'; // Importamos React (Trae todas las funcionalidades de React) y useState (Nos permite crear estados en componentes funcionales)
        
const [name, setName] = useState('');
const [submitted, setSubmitted] = useState(false);  
// Creamos todos los estados necesarios para la funciòn
// const [submitted, setSubmitted] = useState(false); 
// Un estado funciona como una variable que, al cambiar su valor, hace que el componente se vuelva a renderizar para reflejar ese cambio en la interfaz de usuario.
// En este caso submitted guarda un valor booleano(True or False) que indica si el formulario ha sido enviado o no y setSubmitted se utiliza para actualizar ese estado como si fuera un interrumtor.
                                    
const [Target, setTarget] = useState(false);
const [hiddenLoadSure, setHiddenLoadSure] = useState(false);
        
export const createElement = (name) => { // Creamos una funciòn a la cual hay que pasarle como argumento el name que dio el usuario
        
        
        const playerData = name  
        // Crea una variable con el nombre PlayerData
        
        localStorage.setItem('name', playerData);  
        // Guardar la información del jugador en el localStorage, lo cual despues se usara para mostrar en pantalla al jugador
        };
function functionFetch(name,bool,target,hiddenLoadSure){ // se pasan todos los parametros que necesita la funciòn tales como el name, el bool que va a
                                                         // confirmar si se envio la informaciòn y demas
    createElement(name)  // Este estado se usa para guardar el nombre en un str en el localStorage
    setSubmitted(bool);  // Este estado se usa para saner si se subio
    //setTarget(!target) // Esta funciòn quedo en desuso
    setHiddenLoadSure(!hiddenLoadSure) // Este estado se usa para mostrar la siguiente modal 
    setTimeout(() => {  // Se crea una funciòn set timeout. 
                        // Esta funciòn tiene dos parametros setTimeout(funciòn,delay)
        setSubmitted(false); // Despues de un segundo el estado submitted va a volver a ser false
        setName('');       // y tambièn el name va a volver a ser un str pero vacio, igualmente el nombre sigue en el local Storage
                    }, 1000);
          }

const handleSubmit = () => { // Creamos una funciòn llamada handleSubmit
    if (!name.trim()) return;     // Si el nombre esta vacio va a salir de la funciòn si retorna nada
                                  // Debido a que si el nombre esta vacio va a dar false como un estado booleano
                                  // y al estar el ! dar el contrario o el antonimo lo cual da false y hace un return sin nada
    functionFetch(name,true,Target,hiddenLoadSure) // Pasamos los parametros a la funciòn functionFetch
    localStorage.setItem('Process', 'Confirmaciòn de nombre')  // Guardamos en el local Storage la informaciòn de que proceso se esta ejecutando
          }`,
        "confirmName":`
function PermiCameraModal(){
    setHiddenCamera(!camera) // Aparece la modal siguente para seleccionar el tipo de camara
}
  
export const PlayerIdCounter = () => {
    let playerIdCounter = 1 // Inicializa el numero de intentos 
    playerIdCounter = parseInt(localStorage.getItem('playerIdCounter'), 10) || 0; // Pasa a entero el id que se guardo en localStorage en base 10, 
    // y si el resultado es null transforma el playerIdCounter en 0 
    playerIdCounter++; // Suma 1 a playerIdCounter 
    localStorage.setItem('playerIdCounter', playerIdCounter); // Guarda el playerIdCounter en el LocalStorage
}

const buttonHiddenLoad = () => {
  setHiddenLoadSure(!hiddenLoadSure) // Al hacer click en aceptar se oculta la modal de confirmar el nombre
  PermiCameraModal() // Ejecuta la funciòn
  PlayerIdCounter() // Ejecuta la funciòn 
}
`,"selectWebCamera" : `
function PermiCameraModalWeb(){ // Funcion para ejecutar las otras dos funciones
  setHiddenCamera(!camera)  // Esconde la modal de la camara al seleccionar una
  setHiddenFinishWeb(!hiddenfinishWeb) // Abre la ultima modal para terminar el intento
  // En este caso deberìa el jugador tirar sus fichas 
}
`,"selectCellphoneCamera": `function PermiCamera() {
    selectCellphoneCamera()
    async function CameraFunction() {
      try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHiddenCellphone(false)
        setHiddenCellphoneError(true)
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
    PermiCameraModal()
  }


async function guardarDatosEnBackendWithCellphone() {
  const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter'),
        TypeCamera : "Cellphone",
        TypeGame : localStorage.getItem('TypeGame'),
        data_image: localStorage.getItem('data_text_image')
        
  };
    console.log('Estos son los {datos}');
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("https://backend-v2-9f7y.onrender.com/guardar", 
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
}`
    }
    return(
        <main className='w-auto flex flex-col justify-start lg:justify-center text-white' id='BoardGamePoints'>
            <div className="w-auto h-auto flex flex-col justify-around items-center p-4">
                <aside className={` ${points ? 'hidden' : 'block'}`}>
                      <div id='content-1' className=" m-4 rounded-3xl text-black shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Funciones a ejecutar y su explicaciòn</h3>
                <div className="flex flex-col items-center justify-center p-4 gap-7 max-w-2xl">
                    {FunctionsParam ? <CodeBlock code={code[ProcessShow]} /> : "No hay funciones en ejecución"}
                    
                     
                
                </div>
            </div>
                <div id='content-2' className=" m-4 rounded-3xl text-black shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Proceso en ejecuciòn</h3>
                <div className="flex flex-col items-center justify-center p-4">
                    <span>{ProcessParam ? ProcessParam : "No hay procesos en ejecución"}</span>
                                
                </div>
            </div>
                </aside>

                <div id='containerDistribution' className={`text-black m-4 rounded-3xl shadow-lg justify-center flex flex-col items-center p-4 gap-7 ${points ? 'h-auto' : ""}`}>
                    <h3 className="font-black text-center">Distribución de puntaje</h3>
                    <button className="bg-emerald-600" onClick={() => setPoints(!points)}>{points ? "Ocultar Distribución de puntaje" : "Ver Distribución de puntaje"}</button>
                    <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl ${points ? 'grid' : 'hidden'} animate__animated animate__fadeInRightBig`} id='containerPoints'>
                        {pointsArray.map((num) => (
                            <div className="points-new" key={num} id={`${num}`}></div>
                        ))}
                    </div>
                     <div className={`w-auto flex-wrap h-auto justify-center items-center border-2 border-black p-5 rounded-3xl gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeIn`}>
                        <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>-1000 puntos</div>
                        <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>+500 puntos</div>
                        <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>+1000 puntos</div>
                        <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='dark-green'>+1500 puntos</div>
                        <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='light-green'>+3000 puntos</div>
                    </div>
                </div>
                </div>
        </main>
    )
}

export default BoardGamePoints