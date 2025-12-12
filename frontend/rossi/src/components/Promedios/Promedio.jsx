import Puntaje from "./components/Puntaje";
import Nombres from "./components/NombresPosiciones";
import CodeBlock from "../funtions/function_writing/functionWriting";
import { useEffect } from "react";

const codejs1 = `const PedirJugadores = async () => { // Se defini una funcion para pedir los jugadores
    try {
      const lotejugadores = query(collection(dbPun, "datos_guardados")); // Se piden los jugadores de la base de datos y la coleccion datos_guardados
      const snapshot = await getDocs(lotejugadores)  // Espera a que se traigan los jugadores y no continua con la funcion hasta que no se traigan
      const jugadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Se mapean los jugadores para obtener su id y datos
      setJugadores(jugadores); // Se guardan los jugadores en el estado
    } catch (error) {
      console.error("El Error:", error); // Se muestra el error en caso de que algo salga mal
    }
  };
`
const codejs2 = `[{0:Tiempo_de_ejecucion: 454.96 ,Tiempo_de_funcion: 5994.53 ,Tiempo_de_subida: 1906.59 ,captura_realizada: true ,
circulos_detectados: 3 ,id: "258" ,name: "Fede" ,posicion_del_circulo: (3) [15, 9, 7] ,puntaje: -3000},...]`

export default function Promedio() {

useEffect(() => {
  setTimeout(() => {
    const hash = window.location.hash;
    console.log(hash);
    if (!hash) return;

    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, 0);
}, []);

    return (
        <>

            <div id="promedio" className="m-5 text-black space-y-6 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-center tracking-tight">Promedios</h1>
                <p className="text-lg">
                    Para promediar los datos se siguen los siguientes pasos:
                </p>

                <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex justify-center">
                        <CodeBlock codejs={codejs1} />
                    </div>
                </div>

                <p className="text-lg font-semibold">
                    Ejemplo del resultado de la función:
                </p>

                <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex justify-center">
                        <CodeBlock codejs={codejs2} />
                    </div>
                </div>

                <h4 className="text-xl font-bold mt-4">¿Qué es cada cosa?</h4>

                <ul className="list-disc ml-6 space-y-2 text-base">
                    <li><span className="font-semibold">Tiempo de ejecución:</span> tiempo que tarda en correr la función para detectar círculos.</li>
                    <li><span className="font-semibold">Tiempo de función:</span> tiempo de la función completa contando todo.</li>
                    <li><span className="font-semibold">Tiempo de subida:</span> tiempo que tarda en subir datos.</li>
                    <li><span className="font-semibold">Captura realizada:</span> indica si la captura fue exitosa.</li>
                    <li><span className="font-semibold">Círculos detectados:</span> cantidad de círculos detectados.</li>
                    <li><span className="font-semibold">Id:</span> identificador de la captura.</li>
                    <li><span className="font-semibold">Nombre:</span> nombre del jugador.</li>
                    <li><span className="font-semibold">Posición del círculo:</span> posiciones detectadas del círculo.</li>
                    <li><span className="font-semibold">Puntaje:</span> puntaje final del jugador.</li>
                </ul>

            <Puntaje />
            <Nombres />
            </div>
        </>
    )
}