import serial
import time

def setup_arduino():
    arduino = serial.Serial('COM5', 9600)  # el puerto que corresponda a tu Arduino chino xd
    time.sleep(2) #descansa 2 seg
    arduino.write(b'0') #escribe uno y deberia prenderse el led
    arduino.close()

setup_arduino()
# Cierra la conexión correctamente
print("Conexión cerrada correctamente.")
