import React from 'react';
import { useState } from 'react';
import './BoardGameLen.css';
const BoardGameLen = () => {
    const [points, setPoints] = useState(false)
    // Generar un array de 35 números incrementales comenzando desde 1
    const pointsArray = Array.from({ length: 18 }, (_, i) => 18 - i);

    return (
    <main className='w-auto flex flex-col h-screen justify-start lg:justify-center text-white' id='BoardGamePoints'>
        <div className="w-auto h-auto flex flex-col justify-around items-center p-4">

            <aside className={`${points ? 'hidden' : 'block'}`}>
                <div id='content-1' className="m-4 rounded-3xl text-black shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Sistema de Medición</h3>
                    <div className="flex flex-col items-center justify-center p-4 gap-7">
                        <p className="underline font-bold">Aquí se explica cómo funciona el sistema de medición</p>
                        <div>
                            <ul>
                                <li><p>1. Cada instrumento tiene una precisión inicial de referencia.</p></li>
                                <li><p>2. Las mediciones pueden variar dependiendo de la calibración y el instrumento usado.</p></li>
                                <li><p>3. Los valores más precisos permiten obtener resultados más confiables.</p></li>
                                <li><p>4. Las mediciones se pueden registrar en la sección <a href="/PlayersMet">Mediciones</a>.</p></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id='content-2' className="m-4 rounded-3xl text-black shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Registro de Mediciones</h3>
                    <div className="flex flex-col items-center justify-center p-4 gap-7">
                        <p className="underline font-bold">Aquí se explica cómo se registran los datos</p>
                        <div>
                            <ul>
                                <li><p>1. Se inicia el registro introduciendo el instrumento y la unidad de medida.</p></li>
                                <li><p>2. Se activa la función <code>detectar_medidas()</code> para capturar los valores.</p></li>
                                <li><p>3. La información se guarda <a href="http://127.0.0.1:5000/api/mediciones" target="_blank">acá</a>.</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            <div id='containerDistribution' className={`text-black m-4 rounded-3xl shadow-lg justify-center flex flex-col items-center p-4 gap-7 ${points ? 'h-auto' : ""}`}>
                <h3 className="font-black text-center">Distribución de Tolerancias</h3>
                <button className="bg-emerald-600" onClick={() => setPoints(!points)}>
                    {points ? "Ocultar Distribución de Tolerancias" : "Ver Distribución de Tolerancias"}
                </button>

                <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl ${points ? 'grid' : 'hidden'} animate__animated animate__fadeInRightBig`} id='containerPointsLen'>
                    {pointsArray.map((num) => (
                        <div className="tools" key={num} id={`${num}`}></div>
                    ))}
                </div>

                <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeInRightBig`}>
                    <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>Error Máximo</div>
                    <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>Tolerancia Baja</div>
                    <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>Tolerancia Media</div>
                    <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='dark-green'>Tolerancia Alta</div>
                    <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='light-green'>Precisión Óptima</div>
                </div>
            </div>

        </div>
    </main>
)
}

export default BoardGameLen