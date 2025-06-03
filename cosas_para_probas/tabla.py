import matplotlib.pyplot as plt
import numpy as np

def show_graph(id,tamaño,puntos):
    plt.style.use('_mpl-gallery')

    # make the data
    x = [id-0.5]
    y = [id-0.5]
    # size and color:
    # plot
    fig, ax = plt.subplots(figsize=(4, 4), facecolor='white',
                       layout='constrained')

    ax.scatter(x, y, s=1000, c="black", vmin=0, vmax=100)

    ax.set(xlim=(0, tamaño), xticks=np.arange(1, tamaño),
        ylim=(0, tamaño), yticks=np.arange(1, tamaño))

    
    plt.show()
    plt.style.use('_mpl-gallery')
    # make data
    np.random.seed(1)
    array = []
    for i in range(puntos):
        array.append(i)
        

    # plot:
    fig, ax = plt.subplots()
    ax.ecdf(array)
    plt.show()
        

show_graph(3,4,700)