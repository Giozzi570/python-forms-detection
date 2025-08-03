import cv2  # Importa la biblioteca OpenCV para el procesamiento de imágenes y video.
import numpy as np  # Importa la biblioteca NumPy para el manejo de arrays y cálculos matemáticos.
import os  # Importa la biblioteca os para manejo de archivos y carpetas.
# import folder_for_arduino_uno.Arduino as Arduino  # Comentado: originalmente podría usarse para integrar un módulo Arduino personalizado.
import serial  # Importa la biblioteca pySerial para comunicación con Arduino a través del puerto serial.
import time  # Importa time para manejar pausas y esperas en la ejecución.
import matplotlib.pyplot as plt

# -----------------------------------------------------------
# Función: setup_arduino()
# Configura el puerto serial para la comunicación con Arduino.
# def setup_arduino():
#     arduino = serial.Serial('COM5', 9600)  # Abre el puerto serial COM5 a una velocidad de 9600 baudios.
#     time.sleep(2)  # Pausa de 2 segundos para esperar a que Arduino se reinicie y esté listo.
#     arduino.write(b'1')  # Envía el byte '1' (como bytes) al Arduino para indicarle que se realizó una detección.
#     arduino.close()  # Cierra el puerto serial para liberar el recurso.

# -----------------------------------------------------------
# Configuración global
output_folder = "static"  # Define el nombre de la carpeta donde se guardarán las capturas.
captura_path = os.path.join(output_folder, 'captura_cuadrado.jpg')  # Crea la ruta completa para la captura base.

# -----------------------------------------------------------
# Función: created_folder()
# Crea la carpeta de capturas si no existe.
def created_folder():
    if not os.path.exists(output_folder):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(output_folder)  # Si no existe, la crea.

# -----------------------------------------------------------
# Función: show_screen()
# Muestra en pantalla completa un mensaje de "GANASTE" al usuario.
def show_graph(id,tamañoX,tamañoY):
    puntaje = 0
    Verde_fuerte = [18]
    orange = [1,2,4,5]
    red = [3,11,12,13,14,15,17,19,21,22,23,24,25,28,32,33,34]
    yellow = [7,8,9,26,30,31,35]
    green = [6,10,16,20,27,29]
    if id in Verde_fuerte:
        puntaje = 30
    elif id in orange:
        puntaje = 5
    elif id in red:
        puntaje = -10
    elif id in yellow:
        puntaje = 10
    elif id in green:
        puntaje = 15
    else:
        raise TypeError("ID fuera de rango")
    print(f"El puntaje para el ID {id} es: {puntaje}")
    plt.style.use('_mpl-gallery')
    # make the data
    if id >= 1 and id <= 5:
        positionx = [id - 0.5]
        positiony = [0.5]
    elif id >= 6 and id <= 10:
        positionx = [id - 5.5]
        positiony = [1.5]
    elif id >= 11 and id <= 15:
        positionx = [id - 10.5]
        positiony = [2.5]
    elif id >= 16 and id <= 20:
        positionx = [id - 15.5]
        positiony = [3.5]
        print(positionx, positiony)
    elif id >= 21 and id <= 25:
        positionx = [id - 20.5]
        positiony = [4.5]
        print(positionx, positiony)
    elif id >= 26 and id <= 30:
        positionx = [id - 25.5]
        positiony = [5.5]
        print(positionx, positiony)
    elif id >= 31 and id <= 35:
        positionx = [id - 30.5]
        positiony = [6.5]
        print(positionx, positiony)
    else:
        positionx = []
        positiony = []
        raise TypeError("ID fuera de rango")
    fig, ax = plt.subplots(figsize=(3, 5), facecolor='white',
                       layout='constrained')

    ax.scatter(positionx, positiony, s=1000, c="black", vmin=0, vmax=100)

    ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
        ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))

    
    plt.show()
    plt.style.use('_mpl-gallery')
    return puntaje,id
    # make data
# -----------------------------------------------------------
# Función principal: main()
x0, y0 = 10, 10           # Esquina superior izquierda del tablero
ancho_total = 600           # Ancho total del tablero
alto_total = 400            # Alto total del tablero
columnas = 7
filas = 5

ancho_celda = ancho_total // columnas
alto_celda = alto_total // filas

# Crear lista de cuadrados con sus coordenadas y IDs
cuadrados = []
id_actual = 1
for fila in range(filas):
    for columna in range(columnas):
        x = x0 + columna * ancho_celda
        y = y0 + fila * alto_celda
        cuadrados.append((id_actual, x, y, ancho_celda, alto_celda))
        id_actual += 1
        print(f"Cuadrado ID: {id_actual - 1}, Posición: ({x}, {y}), Tamaño: ({ancho_celda}, {alto_celda})")
def detectar_formas():
    captura_hecha = False  # Bandera para saber si ya se hizo una captura y detener el programa.
    id_cuadrado = None     # Inicializa id_cuadrado para evitar errores si no se detecta ningún círculo.
    id = None              # Inicializa id para evitar errores si no se detecta ningún círculo.
    puntaje = None         # Inicializa puntaje para evitar errores si no se detecta ningún círculo.
    created_folder()  # Llama a la función para crear la carpeta de capturas si no existe.
    cap = cv2.VideoCapture(0)  # Inicializa la cámara (0 indica la cámara predeterminada).
    # capturas_hechas = 0  # Contador de capturas hechas (no usado actualmente).
    cuadrados = []  # Lista para almacenar información de los cuadrados detectados.

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Si querés redimensionar la imagen, hacelo acá
        resized_image = frame.copy()

        # Dibujar líneas horizontales y verticales
        for f in range(filas + 1):
            y = y0 + f * alto_celda
            cv2.line(resized_image, (x0, y), (x0 + ancho_total, y), (0, 0, 255), 2)

        for c in range(columnas + 1):
            x = x0 + c * ancho_celda
            cv2.line(resized_image, (x, y0), (x, y0 + alto_total), (0, 0, 255), 2)

        # Dibujar bordes e IDs de cada cuadrado
        for cuadrado in cuadrados:
            id, x, y, w, h = cuadrado
            cv2.rectangle(resized_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(resized_image, f"{id}", (x + 5, y + 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

        # Preparar imagen en escala de grises y aplicar suavizado
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.medianBlur(gray, 5)

        # Detección de círculos
        circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                                    param1=200, param2=70, minRadius=10, maxRadius=100)
        if circles is not None:
            circles = np.uint16(np.around(circles))
            for circle in circles[0, :]:
                cx, cy, r = circle
                cv2.circle(resized_image, (cx, cy), r, (0, 0, 255), 2)
                cv2.putText(resized_image, 'circulo', (cx - 10, cy - r - 10),
                            1, 1, (0, 0, 255), 1)

                # Verificar en qué cuadrado cayó el círculo
            if circles is not None:
                   circles = np.uint16(np.around(circles))
                   for i in circles[0, :]:
                       x, y, r = i
                       cv2.circle(frame, (x, y), r, (0, 255, 0), 2)
                       cv2.circle(frame, (x, y), 2, (0, 0, 255), 3)

                    # Ver si el círculo está dentro del tablero
            if x0 <= x <= x0 + ancho_total and y0 <= y <= y0 + alto_total:
                        col = (x - x0) // ancho_celda
                        fila = (y - y0) // alto_celda
                        id_cuadrado = (col   * filas) + fila + 1
                        id_celda = f"Fila{fila}_Columna{col}"  # Calcula el ID del cuadrado basado en fila y columna.
                        cv2.putText(frame, f"{id_celda}", (x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                        print(f"Ficha detectada en celda: {id_celda}")
                        output_folder = "static"  # Vuelve a usar la carpeta de capturas.
                        captura_path = os.path.join(output_folder, f'captura_cuadrado{round(time.time())}.png')  # Ruta de guardado.
                        cropped_image = resized_image  # Guarda la imagen (nota: aquí se guarda la imagen completa, no recortada).
                        cv2.imshow(f'Captura del cuadrado {id_celda}', cropped_image)  # Muestra la captura.
                        cv2.imwrite(captura_path, cropped_image)  # Guarda la imagen en disco.
                        print(f"✔️ Captura guardada en: {captura_path}")
                        captura_hecha = True  # Marca que se ha hecho una captura.
                        
            if captura_hecha:
                # setup_arduino()  # Envía señal al Arduino.
                print("Arduino configurado y listo para recibir datos.")  # Mensaje de confirmación.
                cv2.waitKey(1000)  # Pausa de 1 segundo.
                captura_hecha = True
                puntaje, id = show_graph(id_cuadrado, 5, 7)  # Muestra el gráfico con el ID del cuadrado capturado.
                print(id, id_cuadrado)
                break  # Sale del bucle principal.

        # -----------------------------------
        # Muestra la imagen procesada en una ventana.
        cv2.imshow('Deteccion en vivo', resized_image)

        # -----------------------------------
        # Permite salir del programa presionando la tecla 'q'.
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # -----------------------------------
    # Libera la cámara y destruye las ventanas al salir del bucle.
    cap.release()
    cv2.destroyAllWindows()
    # Retorna un diccionario con los resultados de la detección
    # Guarda la última imagen capturada si se realizó una captura
    if captura_hecha:
        cv2.imwrite(captura_path, cropped_image)

    return {
        "circulos_detectados": len(circles[0]) if circles is not None else 0,
        "captura_realizada": captura_hecha,
        "puntaje": puntaje,
        "posicion_del_circulo": f"{id}",
        "img": captura_path
    }