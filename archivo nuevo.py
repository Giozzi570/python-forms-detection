import cv2
import numpy as np
import os

# Configuración global
output_folder = "capturas"
captura_path = os.path.join(output_folder, 'captura_cuadrado.png')
captura_hecha = False

def created_folder():
    """Crea la carpeta de capturas si no existe"""
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

def show_screen():
    """Muestra la pantalla de victoria"""
    pantalla = np.zeros((720, 1280, 3), dtype=np.uint8)  # Resolución 1280x720
    
    # Escribir el texto "¡GANASTE!"
    cv2.putText(pantalla, "GANASTE", (250, 400), cv2.FONT_HERSHEY_DUPLEX,
                3, (255, 255, 255), 5, cv2.LINE_AA)

    # Mostrar en pantalla completa
    cv2.namedWindow("Victoria", cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty("Victoria", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    cv2.imshow("Victoria", pantalla)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def main():
    created_folder()
    cap = cv2.VideoCapture(1)  # Usar cámara
    capturas_hechas = 0  # Contador de capturas
    cuadrados = []

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
                    if 0.3 < aspect_ratio < 100:  # Tolerancia para que sea cuadrado
                        cuadrados.append((cuadrado_id, x, y, w, h))
                        cv2.drawContours(resized_image, [approx], -1, (0, 255, 0), 2)
                        cv2.putText(resized_image, f'cuadrado {cuadrado_id}', (x, y - 10), 1, 1, (0, 255, 0), 1)
                        cuadrado_id += 1

        # Detección de círculos con HoughCircles
        circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                                param1=150, param2=70, minRadius=10, maxRadius=100)
        
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
                        cuadrados.pop(id-1)  # Eliminar el cuadrado una vez detectado
                        output_folder = "capturas"
                        captura_path = os.path.join(output_folder, f'captura_cuadrado{id}.png')
                        # Recorte de la región del cuadrado donde está el círculo
                        cropped_image = resized_image
                        cv2.imshow(f'Captura del cuadrado {id}', cropped_image)
                        # Guardar la imagen recortada
                        cv2.imwrite(captura_path, cropped_image)
                        print(f"✔️ Captura guardada en: {captura_path}")
                        capturas_hechas += 1
                        # Detener la captura de video después de la primera detección
                        captura_hecha = True
                        print(f"Se eliminó el cuadrado {id} de la lista y la lista ahora tiene {len(cuadrados)} elementos y quedo con estos elementos {cuadrados}.")
                        break  # Solo procesamos un cuadrado por círculo

            if captura_hecha and capturas_hechas == 3:
                cv2.waitKey(1000)
                show_screen()
                break  # Salimos del bucle principal si ya se ha capturado

        cv2.imshow('Detección en vivo', resized_image)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()