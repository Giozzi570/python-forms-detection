import matplotlib.pyplot as plt
import numpy as np
import os
import time


def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")
# -----------------------------------------------------------
# Función: show_graph()
def show_graph_metrologia_function(id,tamañoX,tamañoY,event):


    #El plt.style.use() puede cambiar el estilo del gráfico

    plt.style.use('_mpl-gallery')

    #Definir datos

    square_calibre = [1,4,7,10,13,16]
    square_micrometro = [2,5,8,11,14,17]
    square_goniometro = [3,6,9,12,15,18]


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
    else:
        print("PERDISTE")
        jugador_gano = False

    # Determinar la posición del cuadrado en el gráfico


    
    if id >= 1 and id <= 3:
        positionx = [0.5]
        positiony = [id - 0.5]
    elif id >= 4 and id <= 6:
        positionx = [1.5]
        positiony = [id - 3.5]
    elif id >= 7 and id <= 9:
        positionx = [2.5]
        positiony = [id - 6.5]
    elif id >= 10 and id <= 12:
        positionx = [3.5]
        positiony = [id - 10.5]
    elif id >= 13 and id <= 15:
        positionx = [4.5]
        positiony = [id - 14.5]
    elif id >= 16 and id <= 18:
        positionx = [5.5]
        positiony = [id - 16.5]
    else:
        positionx = []
        positiony = []
        raise TypeError("ID fuera de rango")
    

    # Crear la figura y los ejes
    fig, ax = plt.subplots(figsize=(3, 5), facecolor='white',
                       layout='constrained')
    
    # Título del gráfico
    ax.set_title("Modo Metrología")

    # Crea el circulo donde cayo la ficha
    ax.scatter(positionx, positiony, s=800, c="black", vmin=0, vmax=100)

    # Configura los límites y las marcas de los ejes
    #ax.set sirve para configurar los límites y las marcas de los ejes
    '''
    tamañoX y tamañoY son la cantidad de columnas y filas respectivamente, donde xlim sirve como xlim = (valor inicial, valor final) mientras que
    ylim sirve como ylim = (valor inicial, valor final)
    xticks sirve para definir las marcas o intervalos en el eje x
    yticks sirve para definir las marcas o intervalos en el eje y
    '''
    folder = "graph"
    created_folder(folder)
    captura_graph = os.path.join(folder,f"grafico{round(time.time())}.png" )

    ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
        ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))
    
        
    plt.savefig(captura_graph)

    # Muestra el gráfico
    return id,jugador_gano

    #Retorna el ID del cuadrado y si el jugador ganó
# -----------------------------------------------------------