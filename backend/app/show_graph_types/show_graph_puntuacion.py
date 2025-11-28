import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import os,time
import base64
from matplotlib.colors import to_rgba
def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")

        
def show_graph_puntuacion_function(id,circles_num,tamañoX,tamañoY):
    puntaje_final = []
    circulos = []
    puntaje = 0
    Verde_fuerte = [2,8,13,14,26,32]
    orange = [0,1,19,20,25,31]
    red = [3,6,7,9,12,15,18,21,24,27,30,33]         # Definimos variables de puntaje, colores, puntaje y la matriz de valores
    yellow = [11,17,22,23,34]
    green = [4,5,10,16,28,29]
    print("Aca esta")
    valores = np.array([
    [1, 2, 3, 1, 5],
    [4, 1, 3, 2, 1],
    [4, 5, 1, 3, 2],                         # ==> array para definir colores y matriz 
    [1, 4, 5, 1, 3],
    [2, 1, 4, 5, 1],
    [3, 2, 1, 5, 4],
    [3, 1, 2, 1, 4]
])  

    # Diccionario de colores en hexadecimal
    colormap = {
        1: '#ff0000',
        2: '#008000',
        3: '#FF6600',
        4: '#00fa0c',
        5: '#FFFF00',   
    }

    # Creamos array vacío para RGBA
    colors = np.empty((valores.shape[0], valores.shape[1], 4))       # ==> crea una array con valores vacios

    # Rellenamos cada celda con su color correspondiente
    for i in range(valores.shape[0]):                                                           # ==> Recorre la array asi (filas)
                                                                                                # [4, 5, 1, 2, 3], 0
                                                                                                # [4, 5, 1, 2, 3], 1ero
                                                                                                # [1, 5, 4, 1, 2], 2do                        
                                                                                                # [3, 1, 5, 4, 1], 3ero
                                                                                                # [2, 3, 1, 5, 4], 4to
                                                                                                # [1, 2, 3, 1, 4], 5to
                                                                                                # [5, 1, 3, 2, 1]  6to
        for j in range(valores.shape[1]):                                   # ==> Despues recorre la lista [==> 4, ==> 5, ==> 1, ==> 2, ==> 3] (columnas)
                                                                            # Primera iteracion serian en el colors[0, 0] y luego pasa los valores ya mapeados en color map, ejemplo 
                                                                            # colormap[valores[0,0]] ==> que da 4 y 4 es igual a '#00fa0c', y despues lo pasa a rgba, donde se convierte en una array
                                                                            # [Red, Green, Blue, Opacity]
            colors[i, j] = to_rgba(colormap[valores[i, j]])

    print(f"Esto es la cantidad de circulos {len(circles_num)}")
    print(f"Esto es la cantidad de circulos {circles_num}")
    for i in range(len(circles_num)): 
        print(f"Circulo {i}: {circles_num[i]}")
        if circles_num[i] in Verde_fuerte:
            puntaje = 5000
        elif circles_num[i] in orange:  
            puntaje = 500                            
        elif circles_num[i] in red:               # ==> Dependiendo de la cantidad de circulos que tenemos en la matriz, es la cantidad de veces que repite el bucle 
            puntaje = -1000                       # ==> Despues cuando pide el [np.uint16(11), np.uint16(25), np.uint16(33)] circles_num[0] da 11 ,y asi para los otros y se fija en que array coincide el numero 
        elif circles_num[i] in yellow:
            puntaje = 1000
        elif circles_num[i] in green:
            puntaje = 1500
        else:
            raise TypeError("ID fuera de rango")
        print(f"El puntaje para el ID {circles_num[i]} es: {puntaje} Puntos")      # ==> Da el puntaje dependiendo de cada circulo
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
        plt.xticks([])
        plt.yticks([])
        print(circulos)
        ax.imshow(colors, aspect='auto', extent=(0, tamañoX, 0, tamañoY))

        ax.grid(color='black', linestyle='-', linewidth=2)
        ax.scatter(*zip(*circulos), color='black', s=200, marker='o', edgecolor='yellow')


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
    return puntaje_final,id, imagen_base64_graph