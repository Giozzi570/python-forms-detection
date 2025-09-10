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
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./passwords/Passwords_firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

CORS(app)  # Permitir CORS para evitar bloqueos del navegador

# Función de ejemplo (sin usar `input()`)
def inputName(name):
    return {
        "name": name,
        "cuadrado": "4",  # Valor de ejemplo
        "points": "100",  # Valor de ejemplo
        "img": "../capturas/captura.png"  # Ruta de ejemplo
    }

# Ruta principal que acepta POST (y opcionalmente GET)
@app.route("/", methods=["GET", "POST"])  # Acepta ambos métodos
def detectar():
    if request.method == "POST":
        datos = request.get_json()  # Obtiene datos JSON del frontend
        nombre = datos.get("nombre")  # Extrae el nombre
        resultado = inputName(nombre)  # Procesa los datos
        return jsonify(resultado)  # Devuelve el resultado en JSON
    else:
        return jsonify({"mensaje": "Envía un POST para procesar datos"})
    # Ruta para guardar los datos

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

        # Validar datos del frontend
    datos = request.get_json()
    if not datos or not all(key in datos for key in ['name', 'id' , 'TypeGame']):
            return jsonify({"error": "Los campos 'name' , 'id' y 'TypeGame' son requeridos"}), 400

        # Combinar datos
    resultado_final = {**datos, **datos_deteccion}

    # Guardar en Firestore
    db.collection('datos_guardados').add(resultado_final)

    return jsonify({"mensaje": "Datos guardados exitosamente"}), 200


@app.route('/api/datos')
def get_datos():
    datos = db.collection('datos_guardados').stream()
    return jsonify([doc.to_dict() for doc in datos])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

