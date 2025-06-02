import cv2  # Importa la biblioteca OpenCV para el procesamiento de imágenes y video.
import numpy as np  # Importa la biblioteca NumPy para el manejo de arrays y cálculos matemáticos.
import os  # Importa la biblioteca os para manejo de archivos y carpetas.
# import folder_for_arduino_uno.Arduino as Arduino  # Comentado: originalmente podría usarse para integrar un módulo Arduino personalizado.
import serial  # Importa la biblioteca pySerial para comunicación con Arduino a través del puerto serial.
import time  # Importa time para manejar pausas y esperas en la ejecución.

# -----------------------------------------------------------
# Función: setup_arduino()
# Configura el puerto serial para la comunicación con Arduino.
def setup_arduino():
    arduino = serial.Serial('COM5', 9600)  # Abre el puerto serial COM5 a una velocidad de 9600 baudios.
    time.sleep(2)  # Pausa de 2 segundos para esperar a que Arduino se reinicie y esté listo.
    arduino.write(b'1')  # Envía el byte '1' (como bytes) al Arduino para indicarle que se realizó una detección.
    arduino.close()  # Cierra el puerto serial para liberar el recurso.

# -----------------------------------------------------------
# Configuración global
output_folder = "capturas"  # Define el nombre de la carpeta donde se guardarán las capturas.
captura_path = os.path.join(output_folder, 'captura_cuadrado.png')  # Crea la ruta completa para la captura base.

# -----------------------------------------------------------
# Función: created_folder()
# Crea la carpeta de capturas si no existe.
def created_folder():
    if not os.path.exists(output_folder):  # Verifica si la carpeta 'capturas' no existe.
        os.makedirs(output_folder)  # Si no existe, la crea.

# -----------------------------------------------------------
# Función: show_screen()
# Muestra en pantalla completa un mensaje de "GANASTE" al usuario.
def show_screen():
    pantalla = np.zeros((720, 1280, 3), dtype=np.uint8)  # Crea una imagen negra de 720x1280 píxeles con 3 canales de color.
    
    # Dibuja el texto "GANASTE" en blanco en la imagen, con fuente grande y grosor de línea 5.
    cv2.putText(pantalla, "GANASTE", (250, 400), cv2.FONT_HERSHEY_DUPLEX,
                3, (255, 255, 255), 5, cv2.LINE_AA)

    # Configura la ventana para mostrarse en pantalla completa.
    cv2.namedWindow("Victoria", cv2.WND_PROP_FULLSCREEN)  # Crea una ventana llamada "Victoria".
    cv2.setWindowProperty("Victoria", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)  # La hace pantalla completa.

    cv2.imshow("Victoria", pantalla)  # Muestra la imagen en pantalla.
    cv2.waitKey(0)  # Espera indefinidamente hasta que se presione una tecla.
    cv2.destroyAllWindows()  # Cierra todas las ventanas de OpenCV.

# -----------------------------------------------------------
# Función principal: main()
def main():
    captura_hecha = False  # Bandera para saber si ya se hizo una captura y detener el programa.
    created_folder()  # Llama a la función para crear la carpeta de capturas si no existe.
    cap = cv2.VideoCapture(0)  # Inicializa la cámara (0 indica la cámara predeterminada).
    # capturas_hechas = 0  # Contador de capturas hechas (no usado actualmente).
    cuadrados = []  # Lista para almacenar información de los cuadrados detectados.

    while True:  # Bucle infinito para procesar cuadros continuamente.
        ret, frame = cap.read()  # Captura un cuadro de la cámara.
        if not ret:  # Si la cámara no devuelve un cuadro válido, sale del bucle.
            break

        # -----------------------------------
        # Redimensiona la imagen para mejorar el rendimiento.
        scale = 0.5  # Factor de escala: reduce la imagen a la mitad.
        width = int(frame.shape[1] * scale)  # Calcula el nuevo ancho.
        height = int(frame.shape[0] * scale)  # Calcula el nuevo alto.
        dim = (width, height)  # Agrupa las dimensiones.
        resized_image = cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)  # Redimensiona la imagen.

        # -----------------------------------
        # Preprocesamiento de la imagen.
        gray = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)  # Convierte la imagen a escala de grises.
        blur = cv2.GaussianBlur(gray, (5, 5), 0)  # Aplica un desenfoque gaussiano para reducir ruido.
        canny = cv2.Canny(blur, 50, 150)  # Aplica el detector de bordes de Canny.

        # -----------------------------------
        # Detección de contornos en la imagen binaria.
        cnts, hierarchy = cv2.findContours(canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        cuadrado_id = 1  # Contador para identificar cada cuadrado detectado.

        # -----------------------------------
        # Filtrado y verificación de contornos.
        for i, c in enumerate(cnts):
            if hierarchy[0][i][3] != -1:  # Ignora contornos internos (hijos).
                continue

            area = cv2.contourArea(c)  # Calcula el área del contorno.
            if area > 500:  # Filtra contornos demasiado pequeños.
                epsilon = 0.02 * cv2.arcLength(c, True)  # Calcula la tolerancia para aproximar el contorno.
                approx = cv2.approxPolyDP(c, epsilon, True)  # Aproxima el contorno a un polígono.

                if len(approx) == 4:  # Si tiene 4 vértices, podría ser un cuadrado.
                    x, y, w, h = cv2.boundingRect(approx)  # Calcula el rectángulo envolvente del cuadrado.
                    aspect_ratio = float(w) / h  # Calcula la relación ancho/alto.
                    if 0.3 < aspect_ratio < 100:  # Filtra por relación de aspecto (muy laxa).
                        cuadrados.append((cuadrado_id, x, y, w, h))  # Guarda el cuadrado.
                        cv2.drawContours(resized_image, [approx], -1, (0, 255, 0), 2)  # Dibuja el contorno verde.
                        cv2.putText(resized_image, f'cuadrado {cuadrado_id}', (x, y - 10), 1, 1, (0, 255, 0), 1)  # Escribe el ID.
                        cuadrado_id += 1  # Incrementa el ID para el próximo cuadrado.

        # -----------------------------------
        # Detección de círculos con la Transformada de Hough.
        circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                                param1=150, param2=70, minRadius=10, maxRadius=100)
        
        if circles is not None:  # Si se detectaron círculos:
            circles = np.uint16(np.around(circles))  # Redondea las coordenadas.
            for circle in circles[0, :]:  # Itera sobre cada círculo detectado.
                cx, cy, r = circle  # Extrae las coordenadas y el radio.
                cv2.circle(resized_image, (cx, cy), r, (0, 0, 255), 2)  # Dibuja el círculo en rojo.
                cv2.putText(resized_image, 'circulo', (cx - 10, cy - r - 10), 1, 1, (0, 0, 255), 1)  # Etiqueta el círculo.

                # -----------------------------------
                # Verifica si el círculo está dentro de algún cuadrado detectado.
                for id, x, y, w, h in cuadrados:
                    if x <= cx <= x + w and y <= cy <= y + h:
                        print(f"🔵 Círculo en cuadrado {id}")  # Imprime que encontró un círculo dentro del cuadrado.
                        cuadrados.pop(id-1)  # Elimina el cuadrado de la lista para evitar duplicados.
                        output_folder = "capturas"  # Vuelve a usar la carpeta de capturas.
                        captura_path = os.path.join(output_folder, f'captura_cuadrado{id}.png')  # Ruta de guardado.
                        cropped_image = resized_image  # Guarda la imagen (nota: aquí se guarda la imagen completa, no recortada).
                        cv2.imshow(f'Captura del cuadrado {id}', cropped_image)  # Muestra la captura.
                        cv2.imwrite(captura_path, cropped_image)  # Guarda la imagen en disco.
                        print(f"✔️ Captura guardada en: {captura_path}")
                        captura_hecha = True  # Marca que ya se realizó la captura.
                        break  # Sale del bucle de cuadrados.

            # -----------------------------------
            # Si se realizó la captura, activa Arduino y muestra la pantalla de victoria.
            if captura_hecha:
                setup_arduino()  # Envía señal al Arduino.
                print("Arduino configurado y listo para recibir datos.")  # Mensaje de confirmación.
                cv2.waitKey(1000)  # Pausa de 1 segundo.
                show_screen()  # Muestra la pantalla de victoria.
                captura_hecha = True
                break  # Sale del bucle principal.

        # -----------------------------------
        # Muestra la imagen procesada en una ventana.
        cv2.imshow('Detección en vivo', resized_image)

        # -----------------------------------
        # Permite salir del programa presionando la tecla 'q'.
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # -----------------------------------
    # Libera la cámara y destruye las ventanas al salir del bucle.
    cap.release()
    cv2.destroyAllWindows()

# -----------------------------------------------------------
# Llama a la función principal para iniciar el programa.
main()
