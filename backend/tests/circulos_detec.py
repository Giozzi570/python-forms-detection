import cv2

camara = cv2.VideoCapture(0)
while True:
    ret, frame = camara.read()
    gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    circulos = cv2.HoughCircles(gris, cv2.HOUGH_GRADIENT, dp=1, minDist=20,
                                                    param1=170, param2=55, minRadius=10, maxRadius=100)
    print(circulos)
    if circulos is not None:
        for circulo in circulos:
            for datos_circulo in circulo:
                x_centro = datos_circulo[0] 
                y_centro = datos_circulo[1]
                redio = datos_circulo[2]
                print(f"Estos son todos lo datos {x_centro},{y_centro} y {redio}")
                cv2.circle(frame,(int(x_centro),int(y_centro)),int(redio),(255,0,0),2)
    cv2.imshow("circulos", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camara.release()        # ==> Cierra la ventana luego de un tiempo
cv2.destroyAllWindows()
