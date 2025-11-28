import os
import time
import json
import base64
import random
from pathlib import Path
import cv2
import numpy as np
import requests
import firebase_admin
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app, get_app
from supabase import create_client
from dotenv import load_dotenv

from deteccion_pc import camera_web_pc
from deteccion_web import camera_web_cellphone
from get_firestore_by_game import firestore_get
from puntuacion_in_live.puntuacion_live import funcion_main
load_dotenv()

app = Flask(__name__)
CORS(app)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)


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
# @app.route('/instruments', metçhods=['POST'])
# def instruments():
#     try:
#         data = request.get_json()  # el JSON que mandás desde JS
#         eleccion = data.get("instrumento")  # por ejemplo: {"instrumento": "Elegi"}

#         if eleccion == "Elegi":
#             lista = ["Micrómetro", "Calibre", "Goniómetro", "Cinta", "Manómetro"]
#             instrumento = random.choice(lista)
#             print(f"Instrumento seleccionado: {instrumento}")
#             return jsonify({"instrumento": instrumento})
#         elif eleccion == "No eligas":
#             instrumento = None
#             print(f"Instrumento seleccionado: {instrumento}")
#             return jsonify({"instrumento": instrumento})
#         else:
#             return jsonify({"mensaje": "Dato no reconocido"}), 400

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
def subir_imagen(bucket, path, data_bytes):
    res = supabase.storage.from_(bucket).upload(
        path,
        data_bytes,
        {
            "content-type": "image/webp"
        }
    )
    return res
def obtener_url(bucket, path):
    url = supabase.storage.from_(bucket).create_signed_url(path, 360)
    return url['signedURL']

@app.route("/jugada/<int:id>")

def imagen(id):
    path = f"capturasJugada/Jugada_{id}.webp"
    try:
        url = obtener_url("jugadasImg", path)
        return jsonify({"url": url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/grafico/<int:id>")

def grafico(id):
    path = f"capturasGraphs/grafico_{id}.webp"
    try:
        url = obtener_url("jugadasImg", path)
        return jsonify({"url": url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/guardar', methods=['POST'])
def guardar():
    inicio_de_funcion = time.time()
        # Validar datos del frontend
    datos = request.get_json()
    if not datos or not all(key in datos for key in ['name', 'id']):
            return jsonify({"error": "Los campos 'name' , 'id' son requeridos"}), 400

    db = firestore_get.get_firestore_by_game("Puntuacion",credentials, initialize_app, get_app, firestore)
    try:
        resultado = camera_web_pc.select_game("Puntuacion")
        inicio_de_subida_de_img = time.time()
        Circulos_detectados = resultado["circulos_detectados"]
        Captura_realizada = resultado["captura_realizada"]
        Puntaje = resultado["puntaje"]
        Img = resultado["img"]
        Img_graph = resultado["img_graph"]
        Tiempo_de_ejecucion = resultado["Time_of_ejecuty"]


        datos_deteccion = {
            "circulos_detectados": Circulos_detectados,
            "captura_realizada": Captura_realizada,
            "puntaje": Puntaje,
            }
        
        try:
            img = base64.b64decode(Img)
            subir_imagen("jugadasImg", f"capturasJugada/Jugada_{datos['id']}.webp", img)
            print("Imagen subida correctamente.")
        except Exception as e:
            print(f"Error al subir imágenes: {e}")
        try:
            img_graph = base64.b64decode(Img_graph)
            subir_imagen("jugadasImg", f"capturasGraphs/grafico_{datos['id']}.webp", img_graph)
            print("Imagen de gráfico subida correctamente.")
        except Exception as e:
            print(f"Error al subir imágenes: {e}")

        

        final_de_subida_de_img = time.time()
        final_de_funcion = time.time()
        Tiempo_de_funcion = round((final_de_funcion - inicio_de_funcion) * 1000, 2)
        Tiempo_de_subida = round((final_de_subida_de_img - inicio_de_subida_de_img) * 1000, 2)
        Tiempo_de_ejecucion = round((Tiempo_de_ejecucion * 1000),2)
        Tiempos = {"Tiempo_de_subida" : Tiempo_de_subida,"Tiempo_de_funcion" : Tiempo_de_funcion, "Tiempo_de_ejecucion" : Tiempo_de_ejecucion}
        resultado_final = {**datos, **datos_deteccion, **Tiempos}
        db.collection('datos_guardados').add(resultado_final)
        return jsonify({"Datos" : resultado_final}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    # if datos['TypeCamera'] == 'Cellphone':
    #     resultado_cellphone = camera_web_cellphone.select_game(datos["TypeGame"], datos["data_image"])
    #     Circulos_detectados = resultado_cellphone["circulos_detectados"]
    #     Captura_realizada = resultado_cellphone["captura_realizada"]
    #     Puntaje = resultado_cellphone["puntaje"]
    #     Gano = resultado_cellphone["Gano"]
    #     Img_tablero = resultado_cellphone["img_tablero"]
    #     Img = resultado_cellphone["img"]

    #     datos_deteccion = {
    #         "circulos_detectados": int(Circulos_detectados),
    #         "captura_realizada": Captura_realizada,
    #         "puntaje": Puntaje,
    #         "Gano": Gano,
    #         "instrument": instrument,
    #         "img": Img_tablero,
    #         "img_graph": Img
    #     }

    #     # Combinar datos
    #     resultado_final = {**datos, **datos_deteccion}

    #     # Guardar en Firestore
    #     db.collection('datos_guardados').add(resultado_final)

    #     return jsonify({"Datos" : resultado_final}), 200

# @app.route('/api/datos')
# def get_datos():
#     datos = db.collection('datos_guardados').stream()
#     return jsonify([doc.to_dict() for doc in datos])
camara = cv2.VideoCapture(0)
@app.route('/recibir', methods=['POST'])
def recibir():
    print("Recibiendo datos")
    datos = request.get_json()
    dato = funcion_main(camara)
    print(f"Datos recibidos: {datos}")
    print(f"Este es el dato {dato}")  # tu procesamiento
    return jsonify(dato)




if __name__ == '__main__':
    app.run(debug=True, port=5000,host="0.0.0.0")

