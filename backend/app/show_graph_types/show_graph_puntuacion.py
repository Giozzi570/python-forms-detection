import matplotlib.pyplot as plt
import numpy as np
import os,time

def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")

        
def show_graph_puntuacion_function(id,tamañoX,tamañoY):
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

    folder = "graph"
    created_folder(folder)
    captura_graph = os.path.join(folder,f"grafico{round(time.time())}.png" )
    plt.savefig(captura_graph)
    ax.set(xlim=(0, tamañoX), xticks=np.arange(1, tamañoX),
        ylim=(0, tamañoY), yticks=np.arange(1, tamañoY))
    
    plt.style.use('_mpl-gallery')
    return puntaje,id