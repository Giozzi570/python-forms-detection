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
        sys.stdout.write(f"\rCámara no encontrada{puntos} en el puerto {num_cam}  ")  # sobrescribe línea
        sys.stdout.flush()
        time.sleep(0.5)
        camara_found = cv2.VideoCapture(0)
    print(f"\nSe encontro una camara despues de {intentos} intentos en el puerto {num_cam}.")


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
                            "puntaje": None
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
