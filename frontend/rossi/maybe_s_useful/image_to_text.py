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
