from email.mime import image
import cv2
import time
import os
import base64

import matplotlib.pyplot as plt
import numpy as np
import os,time

def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")

        
def metrologia(id,tamañoX,tamañoY):
    puntaje = 0
    Verde_fuerte = [18]
    orange = [1,2,4,5]
    red = [3,11,12,13,14,15,17,19,21,22,23,24,25,28,32,33,34]
    yellow = [7,8,9,26,30,31,35]
    green = [6,10,16,20,27,29]
    if id in Verde_fuerte:
        puntaje = 3000
    elif id in orange:
        puntaje = 500
    elif id in red:
        puntaje = -1000
    elif id in yellow:
        puntaje = 100
    elif id in green:
        puntaje = 1500
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

    folder = "graph"
    created_folder(folder)
    captura_graph = os.path.join(folder,f"grafico{round(time.time())}.png" )
    plt.savefig(captura_graph)
    ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
        ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))
    
    plt.style.use('_mpl-gallery')
    return puntaje,id

def prueba(x0=20, y0=40, ancho_total=600, alto_total=400, columnas=7, filas=5):
    captura_hecha = False  # Bandera para saber si ya se hizo una captura y detener el programa.
    id_cuadrado = None     # Inicializa id_cuadrado para evitar errores si no se detecta ningún círculo.
    id = 0   
    output_folder = "Static"          # Inicializa id para evitar errores si no se detecta ningún círculo.
    jugador_gano = None       # Inicializa jugador_gano para evitar errores si no se detecta ningún círculo.
    # capturas_hechas = 0  # Contador de capturas hechas (no usado actualmente).
    cuadrados = []  # Lista para almacenar información de los cuadrados detectados.

    # Crear lista de cuadrados con sus coordenadas y IDs
    ancho_celda = ancho_total // columnas # Ancho de cada celda mediante un cálculo que es, el ancho total dividido por la cantidad de columnas
    alto_celda = alto_total // filas  
    margen_izq = 20
    margen_der = 20
    margen_sup = 40
    margen_inf = 40

    # Ajustar tamaño usable
    ancho_usable = ancho_total - margen_izq - margen_der
    alto_usable = alto_total - margen_sup - margen_inf 
    ancho_celda = ancho_usable // columnas
    alto_celda = alto_usable // filas  # Alto de cada celda mediante un cálculo que es, el alto total dividido por la cantidad de filas
    """ Crear cuadrados 
    Explicacion del bucle:
    El bucle crea una variable fila y se repite la cantidad de veces que hay en filas, luego crea una variable columna y se repite la cantidad de veces que hay en columnas.
    Dentro del bucle, calcula la posición x e y de cada cuadrado basado en su fila y columna, y añade un tuple a la lista cuadrados con el ID actual, posición x, posición y, ancho y alto de la celda.
    Va sumando 1 al ID actual en cada iteración.

    La cantidad de elementos que va a tener el tablero es: {len(cuadrados)} o la cantidad de filas por las columnas: {filas * columnas}
    """
    with open("imagen_base64.txt", "r") as f:
        imagen_base64 = f.read()

            # Decodificar base64 a bytes binarios
    img_bytes = base64.b64decode(imagen_base64)

            # Convertir bytes → numpy array
    nparr = np.frombuffer(img_bytes, np.uint8)
    
            # Decodificar a imagen OpenCV
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    for fila in range(filas):
            print(f"Esta es la fila: {fila} \n-----------------------------------------")
            for columna in range(columnas):
                x = margen_izq + columna * ancho_celda
                y = margen_sup + fila * alto_celda
                cuadrados.append((id, x, y, ancho_celda, alto_celda))
                id += 1
                print(f"Cuadrado ID: {id - 1}, Posición: ({x}, {y}), Tamaño: ({ancho_celda}, {alto_celda})",)

    resized_image = cv2.resize(image, (ancho_total, alto_total))
            # Dibujar bordes e IDs de cada cuadrado

    while True:
        #print("Procesando imagen para detección de círculos...")
        resized_image = cv2.resize(image, (ancho_total, alto_total))
        for cuadrado in cuadrados:
            print(f"Este es el cuadrado: {cuadrado}")
            id, x, y, w, h = cuadrado
            cv2.rectangle(resized_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(resized_image, f"{id}", (x + 5, y + 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)
            # Preparar imagen en escala de grises y aplicar suavizado
        gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
        blur = cv2.medianBlur(gray, 5)
       #print("Procesando imagen para detección de círculos 2 ...")
        # Detección de círculos
        circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1, minDist=100,
                                        param1=150, param2=40, minRadius=10, maxRadius=100)
        if circles is not None:
                print(f"Círculos detectados: {len(circles[0])}")
                circles = np.uint16(np.around(circles))
                for circle in circles[0, :]:
                    cx, cy, r = circle
                    cv2.circle(resized_image, (cx, cy), r, (0, 0, 0), 2)
                    cv2.putText(resized_image, 'Circulo', (cx - 10, cy - r - 10),
                                1, 1, (0, 0, 0), 1)

                    # Verificar en qué cuadrado cayó el círculo
                if circles is not None:
                    circles = np.uint16(np.around(circles))
                    for i in circles[0, :]:
                        x, y, r = i
                        cv2.circle(resized_image, (x, y), r, (0, 255, 0), 2)
                        cv2.circle(resized_image, (x, y), 2, (0, 0, 255), 3)

                        # Ver si el círculo está dentro del tablero
                if x0 <= cx <= x0 + ancho_total and y0 <= cy <= y0 + alto_total:
                            created_folder(output_folder)  # Llama a la función para crear la carpeta de capturas si no existe.
                            col = (cx - margen_izq) // ancho_celda
                            fila = (cy - margen_sup) // alto_celda
                            id_cuadrado = (col   * filas) + fila + 1
                            id_celda = f"Fila{fila}_Columna{col}"  # Calcula el ID del cuadrado basado en fila y columna.
                            cv2.putText(resized_image, f"{id_celda}", (x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                            print(f"Ficha detectada en celda: {id_celda}")
                            captura_path = os.path.join(f"{output_folder}", f'captura_cuadrado{round(time.time())}.webp')
                            cropped_image = resized_image  # Guarda la imagen (nota: aquí se guarda la imagen completa, no recortada).
                            cv2.imshow(f'Captura del cuadrado {id_celda}', cropped_image)  # Muestra la captura.
                            cv2.imwrite(captura_path, cropped_image)  # Guarda la imagen en disco.
                            print(f"✔️ Captura guardada en: {captura_path}")
                            captura_hecha = True  # Marca que se ha hecho una captura.
                            with open(captura_path, "rb") as f:
                                imagen_bytes = f.read()
                            print(f"Imagen guardada en bytes: {len(imagen_bytes)} bytes")
                            # Convertir a base64
                            imagen_base64 = base64.b64encode(imagen_bytes).decode("utf-8")
                if captura_hecha:
                    # setup_arduino()  # Envía señal al Arduino.
                    # print("Arduino configurado y listo para recibir datos.")  Mensaje de confirmación.
                    cv2.waitKey(1000)  # Pausa de 1 segundo.
                    captura_hecha = True
                    id,jugador_gano = metrologia(id_cuadrado, 6, 3)  # Muestra el gráfico con el ID del cuadrado capturado.
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
    cv2.destroyAllWindows()
        # Retorna un diccionario con los resultados de la detección
        # Guarda la última imagen capturada si se realizó una captura

    return({
            "circulos_detectados": len(circles[0]) if circles is not None else 0,
            "captura_realizada": captura_hecha,
            "Gano": jugador_gano,
            "posicion_del_circulo": f"{id}",
            "puntaje": None
        })

a = prueba()

print(a)