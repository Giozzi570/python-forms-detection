import cv2
import numpy as np
from carpeta_created import created_folder,captura_path,captura_hecha
from python_cam import show_screen
created_folder()
cap = cv2.VideoCapture(0)  # Usar cámara

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Escalamos la imagen para agilizar el proceso
    scale = 0.5
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dim = (width, height)
    resized_image = cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)

    # Procesamiento
    gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)  # Escala de grises
    blur = cv2.GaussianBlur(gray, (5, 5), 0)  # Desenfoque para reducir ruido
    canny = cv2.Canny(blur, 50, 150)  # Umbral de Canny ajustado

    # Encontrar los contornos
    cnts, hierarchy = cv2.findContours(canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    cuadrado_id = 1
    cuadrados = []

    for i, c in enumerate(cnts):
        # Filtrar contornos internos (basado en jerarquía)
        if hierarchy[0][i][3] != -1:
            continue

        area = cv2.contourArea(c)
        if area > 500:  # Asegurarse de que los cuadrados sean suficientemente grandes
            epsilon = 0.02 * cv2.arcLength(c, True)  # Ajustar epsilon para mayor precisión
            approx = cv2.approxPolyDP(c, epsilon, True)

            # Si tiene 4 vértices, podría ser un cuadrado
            if len(approx) == 4:
                x, y, w, h = cv2.boundingRect(approx)
                aspect_ratio = float(w) / h  # Relación de aspecto para comprobar que es cuadrado
                if 0.8 < aspect_ratio < 100:  # Tolerancia para que sea cuadrado
                    cuadrados.append((cuadrado_id, x, y, w, h))
                    cv2.drawContours(resized_image, [approx], -1, (0, 255, 0), 2)
                    cv2.putText(resized_image, f'cuadrado {cuadrado_id}', (x, y - 10), 1, 1, (0, 255, 0), 1)
                    cuadrado_id += 1
    # Detección de círculos con HoughCircles
    circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                               param1=150, param2=90, minRadius=10, maxRadius=100)

    if circles is not None:
        circles = np.uint16(np.around(circles))
        for circle in circles[0, :]:
            cx, cy, r = circle
            cv2.circle(resized_image, (cx, cy), r, (0, 0, 255), 2)
            cv2.putText(resized_image, 'circulo', (cx - 10, cy - r - 10), 1, 1, (0, 0, 255), 1)

            # Verificar si el círculo está dentro de algún cuadrado
            for id, x, y, w, h in cuadrados:
                if x <= cx <= x + w and y <= cy <= y + h:
                    print(f"🔵 Círculo en cuadrado {id}")

                    
                    # Recorte de la región del cuadrado donde está el círculo
                    cropped_image = resized_image
                    cv2.imshow(f'Captura del cuadrado {id}', cropped_image)

                    # Guardar la imagen recortada
                    cv2.imwrite(captura_path, cropped_image)
                    print(f"✔️ Captura guardada en: {captura_path}")

                    # Detener la captura de video después de la primera detección
                    captura_hecha = True
                    break  # Solo procesamos un cuadrado por círculo

        if captura_hecha:
            cv2.waitKey(1000)
            show_screen()
            break  # Salimos del bucle principal si ya se ha capturado

    cv2.imshow('Detección en vivo', resized_image)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
