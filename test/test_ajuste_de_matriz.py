import cv2


print(dir(cv2))

camara = cv2.VideoCapture(0)


ret, frame = camara.read()
filas = 7
columnas = 5
ancho_total = 468
alto_total = 350
x0 = 84
y0 = 78
cuadrados = []
cuadrado_id = 0
tamaño_cuadrado_x = ancho_total // filas
tamaño_cuadrado_y = alto_total // columnas
print(f"Cada cuadrado mide {tamaño_cuadrado_x}, {tamaño_cuadrado_y}")
for columna in range(columnas):
    print("-------------------------- o -----------------------")
    print(f"Esta es la columna {columna}")
    for fila in range(filas):
        print("-------------------------- o -----------------------")
        print(f"Esta es la fila {fila}")
        y = x0 + fila * tamaño_cuadrado_x
        x = y0 + columna * tamaño_cuadrado_y
        fy = x0 + (fila + 1 ) * tamaño_cuadrado_x
        fx = y0 + (columna + 1 ) * tamaño_cuadrado_y
        print(f"El cuadrado {cuadrado_id} su posicion es ({x},{y})")
        square = [cuadrado_id,(fy,fx),(y,x),(255,255,255),1]  
        cuadrado_id += 1      # ==> cv2.rectangle(imagen ==> frame, punto_inicial ==> tupla (y,x), punto_final ==> (fy,fx), color, grosor ==> en px)
        cuadrados.append(square)
for cuadrado in cuadrados:
    id,fxy,xy,rgb,grosor = cuadrado
    cv2.rectangle(frame,xy,fxy,rgb,grosor)
cv2.imshow("Hola", frame)
cv2.waitKey(0)  # ==> Cierra la ventana luego de un tiempo
camara.release()
cv2.destroyAllWindows()