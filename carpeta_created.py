import os

output_folder = "capturas"
captura_path = os.path.join(output_folder, f'captura_cuadrado.png')
captura_hecha = False
def created_folder():
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)