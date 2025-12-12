# from numpy.random.mtrand import random
# import random

# def personaje_function(personaje,puntaje):
#     multiplicador = 1
#     suma = 0
#     resta = 0
#     if personaje == "SEAL":
#         if puntaje < 0:
#             puntaje = 0
#         else:
#             multiplicador = round(random.uniform(0.8, 1.4),1)
#         suma = 0 
#     elif personaje == "Nathan":
#         return puntaje, [resta,multiplicador,suma]
#     elif personaje == "Edzio":
#         multiplicador = 1
#         suma = random.randint(1000, 2000)
#     elif personaje == "Peter Pan":
#         multiplicador = 1
#         resta = random.randint(1000,2000)
#     else:
#         return "Hubo un error"
#     print(puntaje,multiplicador,suma,resta)
#     return (puntaje * multiplicador + suma),[resta,multiplicador,suma]