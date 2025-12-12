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
# from personaje.personaje_function import personaje_function

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
        posicion_del_circulo = resultado["posicion_del_circulo"]
        Img_graph = resultado["img_graph"]
        posicion_circulos_px = resultado["posicion_circulos_px"]
        Tiempo_de_ejecucion = resultado["Time_of_ejecuty"]
        
        datos_deteccion = {
            "circulos_detectados": Circulos_detectados,
            "captura_realizada": Captura_realizada,
            "puntaje": Puntaje,
            "posicion_del_circulo": posicion_del_circulo,
            "posicion_circulos_px": posicion_circulos_px,
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
        print("Hola")
        resultado_final = {**datos, **datos_deteccion, **Tiempos}
        print(resultado_final)
        print(type(posicion_circulos_px[0]))
        db.collection('datos_guardados').add(resultado_final)
        return jsonify({"Datos" : resultado_final}), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500



@app.route('/guardarMultijugador', methods=['POST'])
def guardarMultijugador():
    datos = request.get_json()
    if not datos or not all(key in datos for key in ["jugador"]):
            return jsonify({"error": "Los campos 'jugador' son requeridos"}), 400
    print(datos)
    try:
        resultado = camera_web_pc.select_game("Puntuacion")
        Circulos_detectados = resultado["circulos_detectados"]
        Captura_realizada = resultado["captura_realizada"]
        Puntaje = resultado["puntaje"]
        posicion_del_circulo = resultado["posicion_del_circulo"]
        # print(datos["jugador"]["personaje"])
        # print(Puntaje)
        # Puntaje_jugador,array_de_elementos = personaje_function(datos["jugador"]["personaje"],Puntaje)
        datos_deteccion = {
            "circulos_detectados": Circulos_detectados,
            "captura_realizada": Captura_realizada,
            "puntaje": Puntaje,
            # "suma": array_de_elementos[2],
            # "resta": array_de_elementos[0],
            # "multiplicador": array_de_elementos[1],
            "posicion_del_circulo": posicion_del_circulo,
            }

        resultado_final = {**datos, **datos_deteccion}
        print(resultado_final)
        return jsonify({"Datos" : resultado_final}), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


camara = cv2.VideoCapture(1)
@app.route('/recibir', methods=['POST'])
def recibir():
    print("Recibiendo datos")
    datos = request.get_json()
    dato = funcion_main(camara)
    print(f"Datos recibidos: {datos}")
    print(f"Este es el dato {dato}")  # tu procesamiento
    return jsonify(dato)


@app.route('/SinInternet', methods=['POST'])
def guardarSinInternet():
    inicio_de_funcion = time.time()
        # Validar datos del frontend
    datos = request.get_json()
    if not datos or not all(key in datos for key in ['name', 'id']):
            return jsonify({"error": "Los campos 'name' , 'id' son requeridos"}), 400

    try:
        resultado = camera_web_pc.select_game("Puntuacion")
        inicio_de_subida_de_img = time.time()
        Circulos_detectados = resultado["circulos_detectados"]
        Captura_realizada = resultado["captura_realizada"]
        Puntaje = resultado["puntaje"]
        Img = resultado["img"]
        posicion_del_circulo = resultado["posicion_del_circulo"]
        Img_graph = resultado["img_graph"]
        posicion_circulos_px = resultado["posicion_circulos_px"]
        Tiempo_de_ejecucion = resultado["Time_of_ejecuty"]
        
        datos_deteccion = {
            "circulos_detectados": Circulos_detectados,
            "captura_realizada": Captura_realizada,
            "puntaje": Puntaje,
            "posicion_del_circulo": posicion_del_circulo,
            "posicion_circulos_px": posicion_circulos_px,
            }
        

        

        final_de_subida_de_img = time.time()
        final_de_funcion = time.time()
        Tiempo_de_funcion = round((final_de_funcion - inicio_de_funcion) * 1000, 2)
        Tiempo_de_subida = round((final_de_subida_de_img - inicio_de_subida_de_img) * 1000, 2)
        Tiempo_de_ejecucion = round((Tiempo_de_ejecucion * 1000),2)
        Tiempos = {"Tiempo_de_subida" : Tiempo_de_subida,"Tiempo_de_funcion" : Tiempo_de_funcion, "Tiempo_de_ejecucion" : Tiempo_de_ejecucion}
        print("Hola")
        resultado_final = {**datos, **datos_deteccion, **Tiempos}
        print(resultado_final)
        print(type(posicion_circulos_px[0]))
        
        return jsonify({"Datos" : resultado_final}), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000,host="0.0.0.0")


