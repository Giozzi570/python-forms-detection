import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import os,time
import base64
def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")

        
def show_graph_puntuacion_function(id,circles_num,tamañoX,tamañoY):
    puntaje_final = []
    circulos = []
    puntaje = 0
    Verde_fuerte = [2,13,14,26,32]
    orange = [0,1,19,20,25,31]
    red = [3,6,7,9,12,15,18,21,24,27,30,33]
    yellow = [11,17,22,23,34]
    green = [4,5,8,10,16,28,29]
    print("Aca esta")
    print(len(circles_num))
    for i in range(len(circles_num)):
        print(f"Circulo {i}: {circles_num[i]}")
        if circles_num[i] in Verde_fuerte:
            puntaje = 5000
        elif circles_num[i] in orange:
            puntaje = 500
        elif circles_num[i] in red:
            puntaje = -1000
        elif circles_num[i] in yellow:
            puntaje = 1000
        elif circles_num[i] in green:
            puntaje = 1500
        else:
            raise TypeError("ID fuera de rango")
        print(f"El puntaje para el ID {circles_num[i]} es: {puntaje}")
        plt.style.use('_mpl-gallery')
        # make the data
        if 0 <= circles_num[i] <= 34:
            fila = (circles_num[i]) // 7
            columna = (circles_num[i]) % 7
            print(columna,fila)
            positionx = [fila + 0.5]
            positiony = [columna + 0.5]
        else:
            raise TypeError("ID fuera de rango")
        datos = [positionx,positiony]
        circulos.append(datos)
        puntaje_final.append(puntaje)
        print("circulos:", circulos)
        print(f"Total puntaje: {sum(puntaje_final)}")
        puntaje = sum(puntaje_final)
    try:
        fig, ax = plt.subplots(figsize=(3, 5), facecolor='white',
                       layout='constrained')
        plt.style.use('_mpl-gallery')
        print(circulos)
        ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
            ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))
        ax.scatter(*zip(*circulos), color='blue', s=200, marker='o', edgecolor='black')
        folder = "graph_puntuacion"
        created_folder(folder)
        captura_graph = os.path.join(folder,f"grafico{round(time.time())}.webp" )
        plt.savefig(captura_graph)
        print(f"Se guardo en {captura_graph}")
        with open(captura_graph, "rb") as f:
                imagen_bytes = f.read()
        imagen_base64_graph = base64.b64encode(imagen_bytes).decode('utf-8')
        plt.close(fig)  # Cierra la figura para liberar memoria
        
    except Exception as e:
        print("Hubo un error", e)
    return puntaje,id, imagen_base64_graph