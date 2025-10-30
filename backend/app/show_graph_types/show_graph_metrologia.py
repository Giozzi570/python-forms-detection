import base64
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import os
import time
import random
def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")
# -----------------------------------------------------------
# Función: show_graph()
def show_graph_metrologia_function(id,tamañoX,tamañoY,event):


    #El plt.style.use() puede cambiar el estilo del gráfico

    plt.style.use('_mpl-gallery')
    square_manometro = [2,8,13,14,26,32]
    square_calibre = [0,1,19,20,25,31]
    square_micrometro = [3,6,7,9,12,15,18,21,24,27,30,33]
    square_goniometro = [11,17,22,23,34]
    square_cinta = [4,5,10,16,28,29]
    

    #si el evento es "Calibre" y el id esta entre los cuadrados del calibre, el jugador gano


    if event == "Calibre" and id in square_calibre:
        print("GANASTE CON EL CALIBRE")
        jugador_gano = True
    elif event == "Micrometro" and id in square_micrometro:
        print("GANASTE CON EL MICROMETRO")
        jugador_gano = True
    elif event == "Goniometro" and id in square_goniometro:
        print("GANASTE CON EL GONIOMETRO")
        jugador_gano = True
    elif event == "Cinta" and id in square_cinta:
        print("GANASTE CON LA CINTA")
        jugador_gano = True
    elif event == "Manometro" and id in square_manometro:
        print("GANASTE CON EL MANOMETRO")
        jugador_gano = True
    else:
        print(f"PERDISTE con {event}")
        jugador_gano = False

    # Determinar la posición del cuadrado en el gráfico


    
    
    if 0 <= id <= 17:
        fila = id  // 6     # 6 columnas por fila
        columna = id  % 6   # posición dentro de la fila
        positionx = [columna + 0.5]
        positiony = [fila + 0.5]
    else:
        positionx = []
        positiony = []
        raise TypeError("ID fuera de rango")
    

    # Crear la figura y los ejes
    try:
        fig, ax = plt.subplots(figsize=(3, 5), facecolor='white',
                        layout='constrained')
        plt.style.use('_mpl-gallery')
        # Título del gráfico

        # Crea el circulo donde cayo la ficha
        ax.scatter(positionx, positiony, s=1000, c="black")
        ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
            ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))
        # Configura los límites y las marcas de los ejes
        #ax.set sirve para configurar los límites y las marcas de los ejes
        '''
        tamañoX y tamañoY son la cantidad de columnas y filas respectivamente, donde xlim sirve como xlim = (valor inicial, valor final) mientras que
        ylim sirve como ylim = (valor inicial, valor final)
        xticks sirve para definir las marcas o intervalos en el eje x
        yticks sirve para definir las marcas o intervalos en el eje y
        '''
        folder = "graph_metrologia"
        created_folder(folder)
        captura_graph = os.path.join(folder,f"grafico{round(time.time())}.webp" )

        
            
        plt.savefig(captura_graph)
        print(f"Se guardo en {captura_graph}")
        with open(captura_graph, "rb") as f:
                imagen_bytes = f.read()
        imagen_base64_graph = base64.b64encode(imagen_bytes).decode('utf-8')
        plt.close(fig)
    except Exception as e:
        print(f"Error al crear el gráfico: {e}")
        return None
    # Muestra el gráfico
    print(f"jugador_gano: {jugador_gano}")
    return id,jugador_gano,imagen_base64_graph

    #Retorna el ID del cuadrado y si el jugador ganó
# -----------------------------------------------------------