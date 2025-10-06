from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from deteccion_pc import camera_web_pc
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

def get_firestore_by_game(type_game: str):
    """
    Devuelve la conexión (db) a Firestore según el modo de juego.
    type_game puede ser 'Puntuacion' o 'Metrologia'.
    """

    try:
        if type_game == 'Puntuacion':
            cred = credentials.Certificate("../passwords/Passwords_firebase_puntos.json")
            app = initialize_app(cred, name='PuntuacionApp')

        elif type_game == 'Metrologia':
            cred = credentials.Certificate("../passwords/Passwords_firebase_metro.json")
            app = initialize_app(cred, name='MetrologiaApp')

        else:
            raise ValueError(f"Tipo de juego desconocido: {type_game}")

    except ValueError:
        # La app ya estaba inicializada → recuperamos la instancia
        if type_game == 'Puntuacion':
            cred = credentials.Certificate("../passwords/Passwords_firebase_puntos.json")
            app = get_app('PuntuacionApp')

        elif type_game == 'Metrologia':
            cred = credentials.Certificate("../passwords/Passwords_firebase_metro.json")
            app = get_app('MetrologiaApp')

    # Siempre llegamos acá con 'app' definido
    print(f"[INFO] Credenciales utilizadas ({type_game}): {cred}")
    db = firestore.client(app=app)
    return db

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
    if not datos or not all(key in datos for key in ['name', 'id' , 'TypeGame', 'TypeCamera']):
            return jsonify({"error": "Los campos 'name' , 'id' , 'TypeGame' y 'TypeCamera' son requeridos"}), 400

    lista_instruments = ["Micrometro", "Calibre", "Goniometro"]
    instrument = random.choice(lista_instruments)
    print(f"Tipo de juego: {datos['TypeGame']}")

    db = get_firestore_by_game(datos['TypeGame'])

    resultado = camera_web_pc.select_game(datos["TypeGame"])
    Circulos_detectados = resultado["circulos_detectados"]
    Captura_realizada = resultado["captura_realizada"]
    Puntaje = resultado["puntaje"]
    Gano = resultado["Gano"]
    Img = resultado["img"]

    datos_deteccion = {
        "circulos_detectados": Circulos_detectados,
        "captura_realizada": Captura_realizada,
        "puntaje": Puntaje,
        "Gano": Gano,
        "img": Img,
        "instrument": instrument
    }

        # Combinar datos
    resultado_final = {**datos, **datos_deteccion}

    # Guardar en Firestore
    db.collection('datos_guardados').add(resultado_final)

    return jsonify({"mensaje": "Datos guardados exitosamente"}), 200


# @app.route('/api/datos')
# def get_datos():
#     datos = db.collection('datos_guardados').stream()
#     return jsonify([doc.to_dict() for doc in datos])


if __name__ == '__main__':
    app.run(debug=True)

