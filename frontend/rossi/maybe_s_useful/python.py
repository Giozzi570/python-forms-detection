import cv2

def mostrar_video():
    """Muestra el video de la cámara web en una sola ventana."""
    
    # Intenta abrir la cámara con el índice 0 (cámara por defecto).
    cap = cv2.VideoCapture(0)
    
    # Verifica si la cámara se abrió correctamente.
    if not cap.isOpened():
        print("Error: No se pudo acceder a la cámara. Asegúrate de que no está en uso por otro programa.")
        return

    print("Cámara abierta. Presiona 'q' para salir.")

    try:
        while True:
            # Captura un frame del video.
            ret, frame = cap.read()
            
            # Si no se pudo leer el frame, sal del bucle.
            if not ret:
                print("Error: No se pudo leer el frame. Terminando...")
                break
            
            # Muestra el frame en una ventana.
            cv2.imshow('Video en vivo', frame)
            
            # Espera 1 milisegundo y comprueba si se presiona la tecla 'q'.
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        # Libera el objeto de captura de video y cierra todas las ventanas.
        cap.release()
        cv2.destroyAllWindows()
        print("Recursos liberados. Programa finalizado.")

if __name__ == "__main__":
    mostrar_video()
