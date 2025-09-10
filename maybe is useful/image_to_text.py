import base64

with open("imagen.txt", "r") as f:
    data = f.read()

imagen_bytes = base64.b64decode(data)

with open("imagen_recuperada.png", "wb") as f:
    f.write(imagen_bytes)