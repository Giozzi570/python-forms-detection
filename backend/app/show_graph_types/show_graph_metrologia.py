import base64
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import os
import time
import random
def select_board():
    square_calibre = []
    square_micrometro = []
    square_goniometro = []
    square_cinta = []
    square_manometro = []
    square_toquimetro = []
    #Definir datos
    lista_nums = list(range(18))
    for i in range(18):
        num = random.choice(lista_nums)
        if i < 3:
            square_calibre.append(num)
        elif 3 <= i < 6:
            square_micrometro.append(num)
        elif 6 <= i < 9:
            square_goniometro.append(num)
        elif 9 <= i < 12:
            square_cinta.append(num)
        elif 12 <= i < 15:
            square_manometro.append(num)
        else:
            square_toquimetro.append(num)
    print(f"Calibre: {square_calibre}")
    print(f"Micrometro: {square_micrometro}")
    print(f"Goniometro: {square_goniometro}")
    print(f"Cinta: {square_cinta}")
    print(f"Manometro: {square_manometro}")
    
    return square_calibre, square_micrometro, square_goniometro, square_cinta, square_manometro, square_toquimetro
def created_folder(name):
    if not os.path.exists(name):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(name)  # Si no existe, la crea.
        print(f"Carpeta creada: {name}")
# -----------------------------------------------------------
# Función: show_graph()
def show_graph_metrologia_function(id,tamañoX,tamañoY,event,square_calibre,square_micrometro,square_goniometro,square_cinta,square_manometro,square_toquimetro):


    #El plt.style.use() puede cambiar el estilo del gráfico

    plt.style.use('_mpl-gallery')

    

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
    elif event == "Toquimetro" and id in square_toquimetro:
        print("GANASTE CON EL TOQUIMETRO")
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