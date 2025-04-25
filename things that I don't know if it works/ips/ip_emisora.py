import socket

# 1. Crear socket TCP/IP
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # 2. Conectar al servidor
    s.connect(("192.168.1.100", 65432))  
    # 3. Enviar datos (en bytes)
    s.sendall(b"Hola, servidor!")  
    # (Opcional) Recibir respuesta
    respuesta = s.recv(1024)  
    print("Respuesta del servidor:", respuesta.decode())


