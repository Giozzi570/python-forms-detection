import cv2
import numpy as np

# Medidas fijas del tablero en la imagen
x0, y0 = 100, 100           # Esquina superior izquierda del tablero
ancho_total = 700           # Ancho total del tablero (ajustalo según tu cámara)
alto_total = 500           # Alto total del tablero

columnas = 5
filas = 4

ancho_celda = ancho_total // columnas
alto_celda = alto_total // filas

# Abrir la cámara
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Dibujar la grilla
    for f in range(filas + 1):
        y = y0 + f * alto_celda
        cv2.line(frame, (x0, y), (x0 + ancho_total, y), (0, 0, 0), 2)

    for c in range(columnas + 1):
        x = x0 + c * ancho_celda
        cv2.line(frame, (x, y0), (x, y0 + alto_total), (0, 0, 0), 2)

    # Detectar círculos
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 5)

    circulos = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                                param1=200, param2=70, minRadius=10, maxRadius=100)

    if circulos is not None:
        circulos = np.uint16(np.around(circulos))
        for i in circulos[0, :]:
            x, y, r = i
            cv2.circle(frame, (x, y), r, (0, 255, 0), 2)
            cv2.circle(frame, (x, y), 2, (0, 0, 255), 3)

            # Ver si el círculo está dentro del tablero
            if x0 <= x <= x0 + ancho_total and y0 <= y <= y0 + alto_total:
                col = (x - x0) // ancho_celda
                fila = (y - y0) // alto_celda
                id_celda = f"F{fila}_C{col}"
                cv2.putText(frame, f"{id_celda}", (x + 10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                print(f"Ficha detectada en celda: {id_celda}")

    # Mostrar la imagen
    cv2.imshow("Tablero y detección", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
