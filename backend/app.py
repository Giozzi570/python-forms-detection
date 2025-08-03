from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from deteccion.detected_forms import detectar_formas
from pathlib import Path
import os
import numpy as np
import requests
from flask import send_file
app = Flask(__name__)


CORS(app)  # Permite CORS para evitar bloqueos del navegador

# Función de ejemplo (sin usar `input()`)
def inputName(name):
    return {
        "name": name,
        "cuadrado": "4",  # Valor de ejemplo
        "points": "100",  # Valor de ejemplo
        "img": "../capturas/captura.png"  # Ruta de ejemplo
    }

# Ruta principal que acepta POST (y opcionalmente GET)
@app.route("/", methods=["GET", "POST"])  # ¡Acepta ambos métodos!
def detectar():
    if request.method == "POST":
        datos = request.get_json()  # Obtiene datos JSON del frontend
        nombre = datos.get("nombre")  # Extrae el nombre
        resultado = inputName(nombre)  # Procesa los datos
        return jsonify(resultado)  # Devuelve el resultado en JSON
    else:
        return jsonify({"mensaje": "Envía un POST para procesar datos"})
    # Ruta para guardar los datos
@app.route("/guardar-imagen")
def guardar_imagen():
    # Supongamos que ya tenés una imagen como array NumPy
    imagen = np.random.randint(0, 255, (100, 100, 3), dtype=np.uint8)  # ejemplo de imagen aleatoria

    # Guardar en la carpeta static
    ruta = "static/imagen.jpg"
    cv2.imwrite(ruta, imagen)

    return "Imagen guardada"
@app.route('/guardar', methods=['POST'])

def guardar():
    # Obtener datos de detección
    resultado = detectar_formas()
    posicion_del_circulo = resultado["posicion_del_circulo"]
    circulos_detectados = resultado["circulos_detectados"]
    captura_realizada = resultado["captura_realizada"]
    puntaje = resultado["puntaje"] 
    img = resultado["img"]

    datos_deteccion = {
        "circulos_detectados": circulos_detectados,
        "captura_realizada": captura_realizada,
        "puntaje": puntaje,
        "posicion_del_circulo": posicion_del_circulo,
        "img": img
    }

    try:
        # Validar datos del frontend
        datos = request.get_json()
        if not datos or not all(key in datos for key in ['name', 'id']):
            return jsonify({"error": "Los campos 'name' e 'id' son requeridos"}), 400

        # Combinar datos
        resultado_final = {**datos, **datos_deteccion}
        # Guardar en archivo manteniendo formato de lista JSON
        archivo_json = Path('datos_guardados.json')
        if not archivo_json.exists():
            # Si el archivo no existe, crear nuevo con lista
            with open(archivo_json, 'w') as f:
                json.dump([resultado_final], f, indent=2)
        else:
            # Si el archivo existe, leer, actualizar y guardar
            try:
                with open(archivo_json, 'r+') as f:
                    try:
                        datos_existentes = json.load(f)
                        if not isinstance(datos_existentes, list):
                            datos_existentes = [datos_existentes]  # Convertir a lista si no lo era
                    except json.JSONDecodeError:
                        datos_existentes = []
                    
                    datos_existentes.append(resultado_final)
                    
                    f.seek(0)
                    json.dump(datos_existentes, f, indent=2)
                    f.truncate()
            except Exception as e:
                return jsonify({"error": f"Error al guardar: {str(e)}"}), 500

        return jsonify({
            "mensaje": "✅ Datos guardados correctamente",
            "id": datos['id'],
            "data": resultado_final
        })
    
    
    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500


@app.route('/api/datos')
def get_datos():
    ruta_json = os.path.join(os.path.dirname(__file__), 'datos_guardados.json')
    with open(ruta_json, 'r', encoding='utf-8') as f:
        datos = json.load(f)
    return jsonify(datos)


if __name__ == '__main__':
    app.run(debug=True)