import React from 'react';
import { useState, useEffect } from 'react';
import './BoardGame.css';
import CodeBlock from '../../funtions/function_writing/functionWriting';
const BoardGamePoints = ({ProcessParam,FunctionsParam,videoRefParam,videoStyleParam}) => {
const [modals,SetModal] = useState([])
const [points, setPoints] = useState(false)
const [ProcessShow,setProcessShow] = useState("")
const [modal, setModal] = useState("")
const modalName = (name) => {
    setModal(name)
    console.log(name)

  }
// Generar un array de 35 números incrementales comenzando desde 1
const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);
const selectProcess = (process) => {
        if(process == "FirstProcess"){
            console.log("1er")
            SetModal([{Name : "None.py"}]) 
            setProcessShow("writingName")
        }else if(process == "SecondProcess"){
            console.log("2do")
            setProcessShow("confirmName")
        }else if(process == "ThirdWebProcess"){
            console.log("3er Web")
            setProcessShow("selectWebCamera")
        }else if(process == "ThirdCellphoneProcess"){
            console.log("3er Cellphone")
            SetModal([{Name : "camera_web_cellphone.py"},{Name : "show_graph_puntuacion.py"},{Name : "app.py"}]) 
            setProcessShow("selectCellphoneCamera")
        }else if(process == "4to Web"){
          console.log("4to Web")
          SetModal([{Name : "camera_web_pc.py"},{Name : "show_graph_puntuacion.py"},{Name: "app.py"},{Name : "firestore_get.py"}]) 
          setProcessShow("finishTry")
        }
    }

useEffect(() => {selectProcess(FunctionsParam)}, [FunctionsParam])


const codeJs = {
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
}`, "finishTry" : `const buttonHiddenFinishWeb = () => {
  setHiddenFinishWeb(!hiddenfinishWeb)
  guardarDatosEnBackendWithWeb()
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

}`
    }
const codePy = { "writingName" : { "None.py" : `funcion = None
while !(funcion != None)
if funcion == None:
  print("No hay ninguna funciòn ejecutandose 😞")
else:
   mostrar_funciones()`}
,
                 "confirmName" : {"None.py" : `print("No hay ninguna funciòn ejecutandose aùn 😩")`},
                 "selectWebCamera" : { "None.py" : `print("Falta poco para ejecutar una funciòn 😢")`},
                 "selectCellphoneCamera" : {
                  "app.py" : "aca iria lo app.py",
                  "show_graph_puntuacion.py" : "aca iria graph.py",
                  "camera_web_pc.py" : "aca iria lo cellphone.py"},
                 "finishTry" : {
                  "app.py" : "aca iria lo app.py",
                  "show_graph_puntuacion.py" : "aca iria graph.py",
                  "camera_web_pc.py" : `
import cv2  # Importa la biblioteca OpenCV para el procesamiento de imágenes y video.
import numpy as np  # Importa la biblioteca NumPy para el manejo de arrays y cálculos matemáticos.
import os  # Importa la biblioteca os para manejo de archivos y carpetas.
# import serial  Importa la biblioteca pySerial para comunicación con Arduino a través del puerto serial.
import time  # Importa time para manejar pausas y esperas en la ejecución.
import random
from show_graph_types.show_graph_metrologia import show_graph_metrologia_function as metrologia
from show_graph_types.show_graph_puntuacion import show_graph_puntuacion_function as puntuacion
import show_graph_types.show_graph_metrologia 
from show_graph_types.show_graph_metrologia import select_board
import base64
import sys

# -----------------------------------------------------------
# Función: setup_arduino()
# Configura el puerto serial para la comunicación con Arduino.
# def setup_arduino():
#     arduino = serial.Serial('COM5', 9600)  # Abre el puerto serial COM5 a una velocidad de 9600 baudios.
#     time.sleep(2)  # Pausa de 2 segundos para esperar a que Arduino se reinicie y esté listo.
#     arduino.write(b'1')  # Envía el byte '1' (como bytes) al Arduino para indicarle que se realizó una detección.
#     arduino.close()  # Cierra el puerto serial para liberar el recurso.

# -----------------------------------------------------------
# Función: created_folder()
# Crea la carpeta de capturas si no existe.

def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")

# -----------------------------------------------------------

# -----------------------------------------------------------

def select_game(mode_game): 
    resultado = None
    try:
        if mode_game == "Puntuacion":
            resultado = detectar_formas_puntuacion()
        elif mode_game == "Metrologia":
            lista_instruments = ["Micrometro", "Calibre", "Goniometro", "Cinta", "Manometro", "Toquimetro"]
            instrument = random.choice(lista_instruments)
            print(f"Instrumento seleccionado: {instrument}")
            resultado = detectar_formas_metrologia(instrument)
    except Exception as e:
        print("Ocurrió un error:", e)

    return resultado
def detectar_camara():
    puntos = ""
    intentos = 0
    num_cam = 0
    camara_found = cv2.VideoCapture(0)
    puerto = 0
    print("Empezando busqueda")
    while not camara_found.isOpened():
        num_cam += 1
        intentos += 1
        if num_cam > 10:
            num_cam = 0
        puntos += "."
        print(num_cam)
        if len(puntos) > 3:
            puntos = ""
        puerto += 1
        if puerto > 3:
            puerto = 0
        if intentos > 20:
            print("\nNo se pudo encontrar una cámara conectada. Por favor, asegúrese de que la cámara esté conectada correctamente e intente nuevamente.")
            sys.exit()
        sys.stdout.write(f"\rCámara no encontrada{puntos} en el puerto {puerto}  ")  # sobrescribe línea
        sys.stdout.flush()
        time.sleep(0.5)
        camara_found = cv2.VideoCapture(puerto)
    print(f"\nSe encontro una camara despues de {intentos} intentos en el puerto {puerto}.")


def detectar_formas_puntuacion(x0=20, y0=40, ancho_total=600, alto_total=400, columnas=7, filas=5):
    captura_hecha = False  # Bandera para saber si ya se hizo una captura y detener el programa.
    id_cuadrado = None     # Inicializa id_cuadrado para evitar errores si no se detecta ningún círculo.
    id = 0           # Inicializa id para evitar errores si no se detecta ningún círculo.
    puntaje = None         # Inicializa puntaje para evitar errores si no se detecta ningún círculo.
    circles = None
    imagen_base64 = None # Inicializa la cámara (0 indica la cámara predeterminada).
    # capturas_hechas = 0  # Contador de capturas hechas (no usado actualmente).
    ids_cuadrados = []
    cuadrados = []  # Lista para almacenar información de los cuadrados detectados.
    ancho_celda = ancho_total // columnas
    alto_celda = alto_total // filas
    puntajes = []
    for fila in range(filas):
        print(f"Esta es la fila: {fila} \n-----------------------------------------")
        for columna in range(columnas):
            x = x0 + columna * ancho_celda
            y = y0 + fila * alto_celda
            cuadrados.append((id, x, y, ancho_celda, alto_celda))
            id += 1
            print(f"Cuadrado ID: {id - 1}, Posición: ({x}, {y}), Tamaño: ({ancho_celda}, {alto_celda})",)
    while True: 
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("Cámara no disponible, intentando reconectar...")
            detectar_camara()
            time.sleep(1)
            continue 
        print("Cámara conectada correctamente.", cap)
        try:
            while cap.isOpened():
                        ret, frame = cap.read()

                        if not ret:
                                    print("No se pudo capturar el frame, intentando de nuevo...")
                                    cap.release()
                                    time.sleep(1)
                                    break  # vuelve al inicio del bucle hasta que se capture un frame


                        # Si querés redimensionar la imagen, hacelo acá
                        resized_image = frame.copy()

                        # Dibujar bordes e IDs de cada cuadrado
                        for cuadrado in cuadrados:
                            id, x, y, w, h = cuadrado
                            cv2.rectangle(resized_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                            cv2.putText(resized_image, f"{id}", (x + 5, y + 20),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

                        # Preparar imagen en escala de grises y aplicar suavizado
                        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                        blur = cv2.GaussianBlur(gray, (5, 5), 2)

                        # Detección de círculos
                        circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1, minDist=20,
                                                    param1=160, param2=45, minRadius=10, maxRadius=100)
                        if circles is not None:
                            time.sleep(0.1)
                            circles = np.uint16(np.around(circles))
                            for circle in circles[0, :]:
                                cx, cy, r = circle
                                cv2.circle(resized_image, (cx, cy), r, (0, 0, 255), 2)
                                cv2.putText(resized_image, 'circulo', (cx - 10, cy - r - 10),
                                            1, 1, (0, 0, 255), 1)

                                    # Ver si el círculo está dentro del tablero
                            for c in circles[0, :]:
                                x, y, r = c
                                if x0 <= x <= x0 + ancho_total and y0 <= y <= y0 + alto_total:
                                        col = (x - x0) // ancho_celda
                                        fila = (y - y0) // alto_celda
                                        id_cuadrado = fila * columnas + col
                                        id_celda = f"Fila{fila}_Columna{col}"  # Calcula el ID del cuadrado basado en fila y columna.
                                        cv2.putText(frame, f"{id_celda}", (x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                                        print(f"Ficha detectada en celda: {id_celda}")
                                        created_folder("Puntuacion")  # Vuelve a usar la carpeta de capturas.
                                        captura_path = os.path.join("static/Puntuacion", f'captura_cuadrado_puntuacion{round(time.time())}.webp')  # Ruta de guardado.
                                        print(f"Ruta de guardado: {captura_path}")
                                        cropped_image = resized_image  # Guarda la imagen (nota: aquí se guarda la imagen completa, no recortada).
                                        cv2.imshow(cropped_image)
                                        cv2.imwrite(captura_path, cropped_image)  # Guarda la imagen en disco.
                                        print(f"✔️ Captura guardada en: {captura_path}")
                                        captura_hecha = True  # Marca que se ha hecho una captura.
                                        with open(captura_path, "rb") as f:
                                            imagen_bytes = f.read()

                                        # Convertir a base64
                                        imagen_base64 = base64.b64encode(imagen_bytes).decode("utf-8")
                                        ids_cuadrados.append(id_cuadrado)

                            if captura_hecha:
                                # setup_arduino()  # Envía señal al Arduino.
                                # print("Arduino configurado y listo para recibir datos.")  Mensaje de confirmación.
                                captura_hecha = True
                                puntaje, id, imagen_base64_graph = puntuacion(id_cuadrado,ids_cuadrados, 5, 7)  # Muestra el gráfico con el ID del cuadrado capturado.
                                print(id, id_cuadrado)
                                print(circles)
                                print(f"El puntaje total acumulado es: {sum(puntajes)}")
                                print(f"El ID del cuadrado detectado es: {ids_cuadrados}")
                                return {
                            "circulos_detectados": len(circles[0]) if circles is not None else 0,
                            "captura_realizada": captura_hecha,
                            "puntaje": puntaje,
                            "posicion_del_circulo": f"{id}",
                            "img": imagen_base64,
                            "Gano": None,
                            "img_graph": imagen_base64_graph
                        }
                                
                        if circles is None:
                            print("No se detectaron círculos.")
                        # -----------------------------------
                        print(cap.isOpened())
                        # Muestra la imagen procesada en una ventana.

                        # -----------------------------------
                        # Permite salir del programa presionando la tecla 'q'.
                    
                    # -----------------------------------
                    # Libera la cámara y destruye las ventanas al salir del bucle.
            cap.release()
            cv2.destroyAllWindows()
                        # Retorna un diccionario con los resultados de la detección
                        # Guarda la última imagen capturada si se realizó una captura
        except Exception as e:
                print("Ocurrió un error durante la detección:", e)
                print("Conecte una camara y vuelva a intentarlo.")
                detectar_camara()
                    


# Función para detectar formas en el modo de metrología, donde se pasa un event para saber donde tiene que caer la ficha

def detectar_formas_metrologia(event,x0=20, y0=40, ancho_total=600, alto_total=400, columnas=6, filas=3):
    square_calibre, square_micrometro, square_goniometro, square_cinta, square_manometro, square_toquimetro = select_board()
    captura_hecha = False  # Bandera para saber si ya se hizo una captura y detener el programa.
    id_cuadrado = None     # Inicializa id_cuadrado para evitar errores si no se detecta ningún círculo.
    id = 0   
    output_folder = "Metrologia"          # Inicializa id para evitar errores si no se detecta ningún círculo.
    jugador_gano = None       # Inicializa jugador_gano para evitar errores si no se detecta ningún círculo.
    # capturas_hechas = 0  # Contador de capturas hechas (no usado actualmente).
    cuadrados = []  # Lista para almacenar información de los cuadrados detectados.
    # Crear lista de cuadrados con sus coordenadas y IDs
    ancho_celda = ancho_total // columnas # Ancho de cada celda mediante un cálculo que es, el ancho total dividido por la cantidad de columnas
    alto_celda = alto_total // filas      # Alto de cada celda mediante un cálculo que es, el alto total dividido por la cantidad de filas
    """ Crear cuadrados 
    Explicacion del bucle:
    El bucle crea una variable fila y se repite la cantidad de veces que hay en filas, luego crea una variable columna y se repite la cantidad de veces que hay en columnas.
    Dentro del bucle, calcula la posición x e y de cada cuadrado basado en su fila y columna, y añade un tuple a la lista cuadrados con el ID actual, posición x, posición y, ancho y alto de la celda.
    Va sumando 1 al ID actual en cada iteración.

    La cantidad de elementos que va a tener el tablero es: {len(cuadrados)} o la cantidad de filas por las columnas: {filas * columnas}
    """
    for fila in range(filas):
        print(f"Esta es la fila: {fila} \n-----------------------------------------")
        for columna in range(columnas):
            x = x0 + columna * ancho_celda
            y = y0 + fila * alto_celda
            cuadrados.append((id, x, y, ancho_celda, alto_celda))
            id += 1
            print(f"Cuadrado ID: {id - 1}, Posición: ({x}, {y}), Tamaño: ({ancho_celda}, {alto_celda})",)
    while True: 
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("Cámara no disponible, intentando reconectar...")
            detectar_camara()
            time.sleep(1)
            continue 
        print("Cámara conectada correctamente.", cap)
        try:
            while cap.isOpened():
                ret, frame = cap.read()     # Captura un frame de la cámara,y ret es un booleano que indica si la captura fue exitosa.  

                if not ret:
                    print("No se pudo capturar el frame, intentando de nuevo...")
                    cap.release()
                    time.sleep(1)
                    break  # vuelve al inicio del bucle hasta que se capture un frame
                # Dibujar líneas horizontales y verticales
                
                # redimensionar la imagen
                resized_image = frame.copy()
                # Dibujar bordes e IDs de cada cuadrado

                for cuadrado in cuadrados:
                    id, x, y, w, h = cuadrado
                    cv2.rectangle(resized_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(resized_image, f"{id}", (x + 5, y + 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

                # Preparar imagen en escala de grises y aplicar suavizado
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                blur = cv2.medianBlur(gray, 5)

                # Detección de círculos
                circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                                            param1=200, param2=70, minRadius=10, maxRadius=100)
                if circles is not None:
                            time.sleep(0.1)
                            circles = np.uint16(np.around(circles))
                            for circle in circles[0, :]:
                                cx, cy, r = circle
                                cv2.circle(resized_image, (cx, cy), r, (0, 0, 255), 2)
                                cv2.putText(resized_image, 'circulo', (cx - 10, cy - r - 10),
                                            1, 1, (0, 0, 255), 1)
                            if len(circles[0]) > 1:
                                print("Se detectaron múltiples círculos. Asegúrese de que solo haya un círculo en el área de detección.")
                            else:
                                for c in circles[0, :]:
                                    x, y, r = c
                                # Ver si el círculo está dentro del tablero
                                    if x0 <= x <= x0 + ancho_total and y0 <= y <= y0 + alto_total:
                                        created_folder(output_folder)  # Llama a la función para crear la carpeta de capturas si no existe.
                                        col = (x - x0) // ancho_celda
                                        fila = (y - y0) // alto_celda
                                        id_cuadrado = fila * columnas + col
                                        id_celda = f"Fila{fila}_Columna{col}"  # Calcula el ID del cuadrado basado en fila y columna.
                                        cv2.putText(frame, f"{id_celda}", (x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                                        print(f"Ficha detectada en celda: {id_celda}")
                                        captura_path = os.path.join(f"static/{output_folder}", f'captura_cuadrado_metro{round(time.time())}.webp')
                                        cropped_image = resized_image  # Guarda la imagen (nota: aquí se guarda la imagen completa, no recortada).
                                        cv2.imwrite(captura_path, cropped_image)  # Guarda la imagen en disco.
                                        print(f"✔️ Captura guardada en: {captura_path}")
                                        captura_hecha = True  # Marca que se ha hecho una captura.
                                        with open(captura_path, "rb") as f:
                                            imagen_bytes = f.read()

                                        # Convertir a base64
                                        imagen_base64 = base64.b64encode(imagen_bytes).decode("utf-8")

                                if captura_hecha:
                                    # setup_arduino()  # Envía señal al Arduino.
                                    # print("Arduino configurado y listo para recibir datos.")  Mensaje de confirmación.
                                    id,jugador_gano, imagen_base64_graph = metrologia(id_cuadrado, 6, 3,event,square_calibre, square_micrometro, square_goniometro, square_cinta, square_manometro, square_toquimetro)  # Muestra el gráfico con el ID del cuadrado capturado.
                                    print(id, id_cuadrado)
                                    return {
                            "circulos_detectados": len(circles[0]) if circles is not None else 0,
                            "captura_realizada": captura_hecha,
                            "Gano": jugador_gano,
                            "posicion_del_circulo": f"{id}",
                            "img": imagen_base64,
                            "img_graph": imagen_base64_graph,
                            "puntaje": None,
                            "instrument": None
                        }
                            if circles is None:
                                print("No se detectaron círculos.")
                                        # -----------------------------------
                            print(cap.isOpened())
                            # Sale del bucle principal.
                        
            # -----------------------------------
            # Libera la cámara y destruye las ventanas al salir del bucle.
            cap.release()
            cv2.destroyAllWindows()
            # Retorna un diccionario con los resultados de la detección
            # Guarda la última imagen capturada si se realizó una captura
        except Exception as e:
                print("Ocurrió un error durante la detección:", e)
                print("Conecte una camara y vuelva a intentarlo.")
                detectar_camara()
`,
                  "firestore_get.py" : "aca iria lo firestore.py"
                 }

}
    return(
        <main className='w-auto flex flex-col justify-start lg:justify-center text-white' id='BoardGamePoints'>
            <div className="w-auto h-auto flex flex-col justify-around items-center p-4">
                <aside className={` ${points ? 'hidden' : 'block'}`}>
                      <div id='content-1' className=" m-4 rounded-3xl text-black shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Funciones a ejecutar y su explicaciòn</h3>
                <div className="flex flex-col items-center justify-center p-4 gap-7 max-w-sm xl:max-w-4xl">
                    {FunctionsParam ? <CodeBlock codejs={codeJs[ProcessShow]} codepy={codePy[ProcessShow]?.[modal]} modals={modals} modalNameParam={modalName} /> : "No hay funciones en ejecución"}
                    
                     
                
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