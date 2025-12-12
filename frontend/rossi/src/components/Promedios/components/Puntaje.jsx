import CodeBlock from "../../funtions/function_writing/functionWriting"


const codePuntajeJugadores = `[{0: Tiempo_de_ejecucion: 454.96 ,Tiempo_de_funcion: 5994.53 , Tiempo_de_subida: 1906.59 ,captura_realizada: true ,
circulos_detectados: 3, id: "258", name: "Fede",posicion_del_circulo: (3) [15, 9, 7],puntaje: -3000},
{1: Tiempo_de_ejecucion: 442.79 ,Tiempo_de_funcion: 3056.37 ,Tiempo_de_subida: 2068.29 ,captura_realizada: true ,
circulos_detectados: 3, id: "257", name: "F",posicion_del_circulo: (3) [17, 14, 22] , puntaje: 7000}]`
const codePuntaje1 = `jugadores?.map((jugador) => jugador.puntaje).reduce((anterior, actual) => anterior + actual / jugadores.length, 0) || 0

//Esto tambien se puede ver asi 

[{0: Tiempo_de_ejecucion: 454.96 ,Tiempo_de_funcion: 5994.53 , Tiempo_de_subida: 1906.59 ,captura_realizada: true ,
circulos_detectados: 3, id: "258", name: "Fede",posicion_del_circulo: (3) [15, 9, 7],puntaje: -3000},
{1: Tiempo_de_ejecucion: 442.79 ,Tiempo_de_funcion: 3056.37 ,Tiempo_de_subida: 2068.29 ,captura_realizada: true ,
circulos_detectados: 3, id: "257", name: "F",posicion_del_circulo: (3) [17, 14, 22] , puntaje: 7000}]?.map((jugador) => [-3000,7000]).reduce((anterior, actual) => 0 - 3000 / 2, 0) || 0) 
==> (anterior, actual) => -1500 + 7000 / 2, 0) 
==> (anterior, actual) => -1500 + 3500 , 0) 
==> 2000 `

export default function Puntaje() {
    return (
        <div id="puntaje" className="flex flex-col text-black px-6 py-4 space-y-6">

            <h1 className="text-3xl font-bold text-center">
                Puntaje
            </h1>

            <p className="text-lg">
                El puntaje se promedia de la siguiente manera:
            </p>

            <p className="text-lg font-medium">
                Supongamos que tenemos los siguientes jugadores:
            </p>

            <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                <CodeBlock codejs={codePuntajeJugadores} language="javascript" />
            </div>

            <h2 className="text-xl font-semibold mt-4">
                ¿Qué hace esta línea de código?
            </h2>

            <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                <CodeBlock codejs={codePuntaje1} language="javascript" />
            </div>

            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
                <p className="leading-relaxed">
                    La función toma todos los puntajes, los recorre con
                    <span className="font-semibold"> reduce</span> y acumula su suma,
                    dividiendo cada puntaje por la cantidad total de jugadores. De esta forma
                    obtiene el promedio final.
                </p>

                <p className="mt-3 font-semibold text-green-700">
                    Resultado final: 2000
                </p>
            </div>

        </div>

    )
}