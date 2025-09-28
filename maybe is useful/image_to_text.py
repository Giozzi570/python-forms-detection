<<<<<<< HEAD
import base64

# Leer la imagen en binario
with open("example.jpeg", "rb") as f:
    img_bytes = f.read()

# Convertir a base64
img_base64 = base64.b64encode(img_bytes)

# Guardar en un archivo de texto
with open("imagen_base64.txt", "wb") as f:
    f.write(img_base64)

print("Imagen convertida a base64 y guardada en imagen_base64.txt ✅")
=======
import base64

with open("imagen.txt", "r") as f:
    data = f.read()

imagen_bytes = base64.b64decode(data)

with open("imagen_recuperada.png", "wb") as f:
    f.write(imagen_bytes)
>>>>>>> 927ac6592b1facc0c3774a49b0ce1878120b683e
