import cv2
import numpy as np
import time
import requests
import sys

def puntuacion_en_vivo(camara):
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
            if intentos > 40:
                print("\nNo se pudo encontrar una cámara conectada. Por favor, asegúrese de que la cámara esté conectada correctamente e intente nuevamente.")
                sys.exit()
            sys.stdout.write(f"\rCámara no encontrada{puntos} en el puerto {puerto}  ")  # sobrescribe línea
            sys.stdout.flush()
            time.sleep(0.5)
            camara_found = cv2.VideoCapture(puerto)
        return camara_found
        print(f"\nSe encontro una camara despues de {intentos} intentos en el puerto {puerto}.")
    def detectar_circulos(frame,circulos_guardados):
        gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gris, (5, 5), 2)
        circulos = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1, minDist=20,
                                                        param1=150, param2=60, minRadius=10, maxRadius=100)
        print(circulos)
        x0 = 84
        y0 = 78
        filas = 7
        columnas = 5
        ancho_total = 468
        alto_total = 350
        if circulos is not None:
            for circulo in circulos:
                for datos_circulo in circulo:
                        x_centro = datos_circulo[0] 
                        y_centro = datos_circulo[1]
                        redio = datos_circulo[2]
                        cv2.circle(frame,(int(x_centro),int(y_centro)),int(redio),(255,0,0),2)
                        if (x_centro >= x0 and x_centro <= x0 + ancho_total) and (y_centro >= y0 and y_centro <= y0 + alto_total):
                            fila = int((x_centro - x0) // (ancho_total // filas))
                            columna = int((y_centro - y0) // (alto_total // columnas))
                            id_circle = ((columna * filas) + fila) -1
                            if any(abs(x_centro - circle_save[0]) < 10 and abs(y_centro - circle_save[1]) < 10 for circle_save in circulos_guardados):
                                pass
                            else:
                                circulos_guardados.append(datos_circulo)
                                circulos_ids.append(id_circle)
        
        return circulos,circulos

    def cacular_puntaje(circles):
        Verde_fuerte = [2,8,13,14,26,32]
        orange = [0,1,19,20,25,31]
        red = [3,6,7,9,12,15,18,21,24,27,30,33]         # Definimos variables de puntaje, colores, puntaje y la matriz de valores
        yellow = [11,17,22,23,34]
        green = [4,5,10,16,28,29]
        for point in circles:
            if point in id_ya_calculado:
                print("Este ya esta")
                continue
            else:
                if point in Verde_fuerte:
                            puntaje.append(5000)
                            color.append("Verde fuerte")
                elif point in orange:  
                            puntaje.append(500)   
                            color.append("Naranja")                      
                elif point in red:               # ==> Dependiendo de la cantidad de circulos que tenemos en la matriz, es la cantidad de veces que repite el bucle 
                            puntaje.append(-1000) 
                            color.append("Rojo")                     # ==> Despues cuando pide el [np.uint16(11), np.uint16(25), np.uint16(33)] circles_num[0] da 11 ,y asi para los otros y se fija en que array coincide el numero 
                elif point in yellow:
                            puntaje.append(1000)
                            color.append("Amarillo")
                elif point in green:
                            puntaje.append(1500)
                            color.append("Verde")
                else:
                            raise TypeError("ID fuera de rango")
                id_ya_calculado.append(point)
                print(f"Puntaje de ID {point}: ----> {puntaje}")
        return puntaje,color
    # def posiciones_del_circulo(circles):
    #     print(circles)
    #     circulos_append = []
    #     try:
    #         for list_Circle in circles:
    #             for circle in list_Circle:
    #                 circulos_append.append(circle)
    #                 print(circulos_append)
    #         return circulos_append
    #     except TypeError:
    #         print("No hay circulos")
    #         return None
    # def añadir_circulo_mediante_umbral(circle,circulos_guardados,umbral):
    #     x,y,radio = circle
    #     if any(abs(c[0] - circle[0]) <= umbral and (c[1] - circle[1]) <= umbral for c in circulos_guardados):
    #         print("No entras")
    #         print(circle)
    #     else:
    #         print("Entras")
    #         print(circle)
    #         circulos_guardados.append(circle)
    #     return circulos_guardados
    # def posicion_del_circulo(list_of_circles,circulos_saves):
    #     try:
    #         for circle in list_of_circles:
    #             print(circle)
    #             circulos = añadir_circulo_mediante_umbral(circle,circulos_saves,3)
    #             print(f". La posicion X es {circle[0]} \n. La posicion Y es {circle[1]} \n. El radio es {circle[2]}")
    #     except TypeError:
    #             print("No hay circulos")
    #     return list_of_circles,circulos

    def son_los_mismo_ids(circulos_guardados,circulos_nuevos):
        time.sleep(0.2)
        umbral = 1
        mismo_frame = None
        if circulos_nuevos is not None and circulos_anteriores is not None:
            for circulo in circulos_nuevos:
                for c in circulo:
                    if any(abs(c[0] - circle_old[0]) < umbral and abs(c[1] - circle_old[1]) < umbral for circle_old in circulos_guardados):
                        mismo_frame = True
                    else:
                        circulos_anteriores.clear()
                        circulos_ids.clear()
                        print("se limpio la lista")
                        mismo_frame = False
        else:
            circulos_anteriores.clear()

        if mismo_frame:
            pass
        else:
            print("No es el mismo frame")
            circulos_anteriores.clear()
            circulos_ids.clear()
            puntaje.clear()
            id_ya_calculado.clear()
        return mismo_frame
        # for circle in circulos_nuevos:
        #     for c in circle:
        #         print(c)
        #         if any(abs(c[0] - float(circle_old[0])) < 10 and abs(c[1] - float(circle_old[1])) < 10 for circle_old in circulos_anteriores[0]):
        #             print("No se movio")
        # for circle in circulos_anteriores:
        #     print(circle[0])

    circulos_anteriores = []
    circulos_ids = []
    id_ya_calculado = []
    puntaje = []
    color = []
    while True:
        ret, frame = camara.read()
        if not ret or frame is None:
            print("No se pudo leer frame, intentando reconectar...")
            camara.release()
            camara = detectar_camara()
            continue
        # filas,columnas,x0,y0,ancho_total,alto_total = dibujar_matriz()
        cacular_puntaje(circulos_ids)
        circulos,datos_circulos = detectar_circulos(frame,circulos_anteriores)
        print(circulos_anteriores)
        print(f"Estos son los ids {circulos_ids}")
        mismo_frame = son_los_mismo_ids(circulos_anteriores,circulos)
        puntaje,color = cacular_puntaje(circulos_ids)
        print(f"Este es el {sum(puntaje)}")
        print(f"Este es el tamaño de la lista {len(puntaje)}")
        if len(puntaje) > 0:
            print("Se rompio el bucle")
            break
    camara.release()        # ==> Cierra la ventana luego de un tiempo
    cv2.destroyAllWindows()
    return puntaje,circulos_ids,color,datos_circulos
def funcion_main(camara):
    while True:
        puntaje,circulos_id,color,datos_circulos = puntuacion_en_vivo(camara)
        url = "http://localhost:5000/recibir"
        print(circulos_id)
        datos_circulos = datos_circulos.tolist()
        
        dato = {"puntaje": puntaje, "ids": circulos_id,"datos_circulos": datos_circulos[0],"color": color}  
        print(F"Tamaño de la lista {len(puntaje)}")
        break
    return dato

