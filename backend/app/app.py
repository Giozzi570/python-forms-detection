from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from deteccion_pc import camera_web_pc
from deteccion_web import camera_web_cellphone
from get_firestore_by_game import firestore_get
from pathlib import Path
import os
import numpy as np
import requests
from flask import send_file
app = Flask(__name__)
import firebase_admin
from firebase_admin import credentials, firestore
import random

from firebase_admin import credentials, firestore, initialize_app, get_app

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

        # Validar datos del frontend
    datos = request.get_json()
    if not datos or not all(key in datos for key in ['name', 'id' , 'TypeGame', 'TypeCamera', 'data_image']):
            return jsonify({"error": "Los campos 'name' , 'id' , 'TypeGame' , 'TypeCamera' y 'data_image' son requeridos"}), 400

    lista_instruments = ["Micrometro", "Calibre", "Goniometro"]
    instrument = random.choice(lista_instruments)
    print(f"Tipo de juego: {datos['TypeGame']}")

    db = firestore_get.get_firestore_by_game(datos['TypeGame'],credentials, initialize_app, get_app, firestore)
    try:
        if datos['TypeCamera'] == 'WebCam':
            resultado = camera_web_pc.select_game(datos["TypeGame"])
            Circulos_detectados = resultado["circulos_detectados"]
            Captura_realizada = resultado["captura_realizada"]
            Puntaje = resultado["puntaje"]
            Gano = resultado["Gano"]
            Img = resultado["img"]
            Img_graph = resultado["img_graph"]

            datos_deteccion = {
                "circulos_detectados": Circulos_detectados,
                "captura_realizada": Captura_realizada,
                "puntaje": Puntaje,
                "Gano": Gano,
                "img": Img,
                "instrument": instrument,
                "img_graph": Img_graph
            }

                # Combinar datos
            resultado_final = {**datos, **datos_deteccion}

            # Guardar en Firestore
            db.collection('datos_guardados').add(resultado_final)

            return jsonify({"Datos" : resultado_final}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    if datos['TypeCamera'] == 'Cellphone':
        resultado_cellphone = camera_web_cellphone.select_game(datos["TypeGame"], datos["data_image"])
        Circulos_detectados = resultado_cellphone["circulos_detectados"]
        Captura_realizada = resultado_cellphone["captura_realizada"]
        Puntaje = resultado_cellphone["puntaje"]
        Gano = resultado_cellphone["Gano"]
        Img_tablero = resultado_cellphone["img_tablero"]
        Img = resultado_cellphone["img"]

        datos_deteccion = {
            "circulos_detectados": int(Circulos_detectados),
            "captura_realizada": Captura_realizada,
            "puntaje": Puntaje,
            "Gano": Gano,
            "instrument": instrument,
            "img": Img_tablero,
            "img_graph": Img
        }

        # Combinar datos
        resultado_final = {**datos, **datos_deteccion}

        # Guardar en Firestore
        db.collection('datos_guardados').add(resultado_final)

        return jsonify({"Datos" : resultado_final}), 200

# @app.route('/api/datos')
# def get_datos():
#     datos = db.collection('datos_guardados').stream()
#     return jsonify([doc.to_dict() for doc in datos])


if __name__ == '__main__':
    app.run(debug=True, port=5000,host="0.0.0.0")

