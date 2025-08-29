import React from 'react';
import { useState } from 'react';
import './BoardGamePoints.css';
const BoardGamePoints = () => {
    const [points, setPoints] = useState(false)
    // Generar un array de 35 números incrementales comenzando desde 1
    const pointsArray = Array.from({ length: 35 }, (_, i) => 35 - i);

    return(
        <main>
            <div className="w-full flex flex-col h-screen justify-center text-white">
                <aside className={` ${points ? 'hidden' : 'block'}`}>
                      <div className=" m-4 rounded-3xl border-2 bg-gray-600 border-gray-300 shadow-lg animate__animated animate__fadeIn">
                    <h3 className="font-black text-center p-2">Sistema de puntaje</h3>
                <div className="flex flex-col items-center justify-center p-4 gap-7">
                     <p className="underline font-bold">Aquí se explica como funciona el sistema de puntaje</p>
                <div>
                    <ul>
                        <li><p>1. Cada jugador tiene un puntaje inicial de 0.</p></li>
                        <li><p>2. Los puntos se pueden ganar en mayor o menor medida dependiendo de donde cae la ficha.</p></li>
                        <li><p>3. El jugador con más puntos al final del juego es el ganador.</p></li>
                        <li><p>4. Los puntos se pueden visualizar en la pagina <a href="/players">Jugadores</a>.</p></li>
                    </ul>
                </div>
                
                </div>
            </div>
                <div className=" m-4 rounded-3xl border-2 border-gray-300 shadow-lg animate__animated animate__fadeIn bg-gray-600">
                    <h3 className="font-black text-center p-2">Como se guarda la información</h3>
                <div className="flex flex-col items-center justify-center p-4 gap-7">
                     <p className="underline font-bold">Aquí se explica como se guarda la información</p>
                <div>
                    <ul>
                        <li><p>1. Al iniciar el juego, con un nombre y dar click en "Enviar".</p></li>
                        <li><p>2. Inicia una función llamada detectar_formas().</p></li>
                        <li><p>3. La informacion se guarda <a href="http://127.0.0.1:5000/api/datos" target="_blank">Acá</a>.</p></li>
                    </ul>
                </div>
                </div>
            </div>
                </aside>

                <div id='containerDistribution' className={` bg-gray-600 m-4 rounded-3xl border-2 border-gray-300 shadow-lg flex flex-col items-center p-4 gap-7 ${points ? 'h-screen' : ""}`}>
                    <h3 className="font-black text-center">Distribución de puntaje</h3>
                    <button className="bg-emerald-600" onClick={() => setPoints(!points)}>Ver Distribución de puntaje</button>
                    <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl ${points ? 'grid' : 'hidden'} animate__animated animate__fadeInRightBig`} id='containerPoints'>
                        {pointsArray.map((num) => (
                            <div className="points" key={num} id={`${num}`}></div>
                        ))}
                    </div>
                     <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeInRightBig`}>
                        <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>-10 puntos</div>
                        <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>+5 puntos</div>
                        <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>+10 puntos</div>
                        <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='dark-green'>+15 puntos</div>
                        <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='light-green'>+30 puntos</div>
                    </div>
                </div>
                </div>
        </main>
    )
}

export default BoardGamePoints