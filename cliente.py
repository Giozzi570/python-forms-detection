import socket

# 1. Crear socket TCP/IP
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # 2. Vincular a una IP y puerto
    s.bind(("0.0.0.0", 65432))  
    # 3. Escuchar conexiones (hasta 5 en cola)
    s.listen(5)  
    print("Esperando conexión...")
    # 4. Aceptar una conexión
    conn, addr = s.accept()  
    with conn:
        print(f"Conexión establecida desde {addr}")
        # 5. Recibir datos (hasta 1024 bytes)
        data = conn.recv(1024)  
        print("Mensaje recibido:", data.decode())
        # (Opcional) Enviar una respuesta
        conn.sendall(b"Recibido!")