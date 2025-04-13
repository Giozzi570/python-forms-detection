import cv2
import numpy as np

# Crear una imagen negra (fondo)
def show_screen():
    pantalla = np.zeros((720, 1280, 3), dtype=np.uint8)  # Resolución 1280x720

    # Escribir el texto "¡GANASTE!"
    cv2.putText(pantalla, "GANASTE", (250, 400), cv2.FONT_HERSHEY_DUPLEX,
                3, (255, 255, 255), 5, cv2.LINE_AA)

    # Mostrar en pantalla completa
    cv2.namedWindow("Victoria", cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty("Victoria", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    cv2.imshow("Victoria", pantalla)

    # Esperar a que se presione una tecla para cerrar
    cv2.waitKey(0)
    cv2.destroyAllWindows()