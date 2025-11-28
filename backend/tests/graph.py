import cv2
import time

camara = cv2.VideoCapture(0)
ultimo_tiempo = 0
intervalo = 3  # segundos

while True:
    ret, frame = camara.read()
    if not ret:
        break

    # Mostrar la cámara en tiempo real
    cv2.imshow("Camara", frame)

    # Procesar solo cada 3 segundos
    tiempo_actual = time.time()
    if tiempo_actual - ultimo_tiempo >= intervalo:
        # Aquí hacés todo lo de detección de círculos y puntaje
        print("Procesando frame")
        ultimo_tiempo = tiempo_actual

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camara.release()
cv2.destroyAllWindows()
