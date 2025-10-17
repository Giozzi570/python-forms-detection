
def get_firestore_by_game(type_game: str, credentials, initialize_app, get_app, firestore):
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
