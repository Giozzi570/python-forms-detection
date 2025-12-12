import CodeBlock from "../../funtions/function_writing/functionWriting"

const codeNombres = `posiciones = {}
for (const jugador of jugadores) { // se hace un bucle para cada jugador, la primera vuelta el jugador seria 
    console.log(jugador) ==> {0: Tiempo_de_ejecucion: 454.96 ,Tiempo_de_funcion: 5994.53 , Tiempo_de_subida: 1906.59 ,captura_realizada: true ,
                              circulos_detectados: 3, id: "258", name: "Fede",posicion_del_circulo: (3) [15, 9, 7],puntaje: -3000} 
    for (const posicion of jugador.posicion_del_circulo) { // luego accede a posicion_del_circulo: (3) [15, 9, 7]
        posiciones['posicion-{posicion}'] = {   // En la lista posiciones se agrega la key o llave 'posicion-{posicion}' que en la primera vuelta seria 15
                                                // Luego 9 y despues 7
            names: [...(posiciones['posicion-{posicion}']?.names || []), jugador.name],                   
            cantidad: (posiciones['posicion-{posicion}']?.cantidad || 0) + 1
            // Esta lista terminaria asi 
            posiciones = {posicion-15: {names: "Fede", cantidad: 1},posicion-9: {names: "Fede", cantidad: 1}, posicion-7: {names: "Fede", cantidad: 1}}
        };

        // Pero al ser un bucle for, se repite para cada jugador el Siguiente jugador es ejemplo, 
        // {2: Tiempo_de_ejecucion: 442.79 ,Tiempo_de_funcion: 3056.37 ,Tiempo_de_subida: 2068.29 ,captura_realizada: true ,circulos_detectados: 3, id: "257", 
        // name: "Carlos",posicion_del_circulo: (3) [15, 9, 7] , puntaje: -3000},
    // ahora el valor jugador es {2: Tiempo_de_ejecucion: 442.79 ,Tiempo_de_funcion: 3056.37 ,Tiempo_de_subida: 2068.29 ,captura_realizada: true ,circulos_detectados: 3, id: "257", 
    // name: "Carlos",posicion_del_circulo: (3) [15, 9, 7] , puntaje: -3000},
    // La posicion ahora es 15 en la primera vuelta, luego 9 y despues 7   
    // Por ultimo, crea de nuevo la key pero con los valores nuevos, en names pide el array de nombres existente o crea uno vacio si no existe, y con cantidad suma el jugador actual
    // Antes era {posicion-15: {names: "Fede", cantidad: 1},posicion-9: {names: "Fede", cantidad: 1}, posicion-7: {names: "Fede", cantidad: 1}}
    // Ahora es {posicion-15: {names: ["Fede","Carlos"], cantidad: 2},posicion-9: {names: ["Fede","Carlos"], cantidad: 2}, posicion-7: {names: ["Fede","Carlos"], cantidad: 2}}
    // y El tercero seria lo mismo y en caso de haber una posicion nueva que no existia, se crearia con el nombre del jugador actual y la cantidad 1
    }
}`

const codeNombres2 = `posicion-15: {names: Array(2), cantidad: 2},posicion-9: {names: Array(1), cantidad: 1}, posicion-7: {names: Array(1), cantidad: 1}
// si accedemos a posicion-15 
posicion-15: {cantidad: 2,names: Array(2)}
// si accedemos a cantidad
2
// si accedemos a names
Array(2)
0
: 
"Fede"
1
: 
"F"`

const codeNombres3 = `[{0: Tiempo_de_ejecucion: 454.96 ,Tiempo_de_funcion: 5994.53 , Tiempo_de_subida: 1906.59 ,captura_realizada: true ,
circulos_detectados: 3, id: "258", name: "Fede",posicion_del_circulo: (3) [15, 9, 7],puntaje: -3000},
{1: Tiempo_de_ejecucion: 442.79 ,Tiempo_de_funcion: 3056.37 ,Tiempo_de_subida: 2068.29 ,captura_realizada: true ,
circulos_detectados: 3, id: "257", name: "Carlos",posicion_del_circulo: (3) [15, 9, 7] , puntaje: -3000}],
${codeNombres}


`

export default function Nombres() {
    return (
        <div className="flex flex-col text-black mx-auto px-4 py-8 space-y-8">

            <h1 id="nombresyposiciones" className="text-4xl font-extrabold text-center tracking-tight">
                Nombres y posiciones
            </h1>

            <p className="text-lg leading-relaxed">
                Suponiendo que nuestros jugadores son los mismos:
            </p>

            <div className="rounded-xl bg-gray-100 p-5 shadow-sm border border-gray-300 overflow-visible">
                <CodeBlock codejs={codeNombres} language="javascript" />
            </div>


            <div className="space-y-4 text-lg leading-relaxed">
                <p>
                    Esta función recorre jugador por jugador, y por cada jugador accede a su lista de posiciones del círculo.
                </p>

                <p>
                    Luego, para cada posición, actualiza el objeto{" "}
                    <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                        posiciones
                    </span>{" "}
                    copiando el array de nombres existente o creándolo vacío si no existe, y sumando al jugador actual.
                </p>
            </div>

            <p className="text-lg font-semibold">Ejemplo</p>

            <div className="rounded-xl bg-gray-100 p-5 shadow-sm border border-gray-300">
                <CodeBlock codejs={codeNombres2} language="javascript" />
            </div>

            <p className="leading-relaxed">
                Como vemos, el objeto{" "}
                <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                    posiciones
                </span>{" "}
                tiene la cantidad de nombres y la cantidad de veces que aparecen.
            </p>

            <p className="leading-relaxed">
                Para dejarlo más claro: si quiero entrar alguien que se llama Carlos y
                sus posiciones son{" "}
                <span className="font-mono bg-gray-200 px-1 py-0.5 rounded">
                    posicion_del_circulo: [15, 9, 7]
                </span>
            </p>

            <h2 className="text-2xl font-bold">Entonces...</h2>

            <h3 className="text-xl font-semibold">Pedimos los jugadores de vuelta</h3>

            <div className="rounded-xl bg-gray-100 p-5 shadow-sm border border-gray-300">
                <CodeBlock codejs={codeNombres3} language="javascript" />
            </div>
        </div>

    )
}
