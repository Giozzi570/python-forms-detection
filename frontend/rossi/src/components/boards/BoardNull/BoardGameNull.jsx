import React from 'react';
import { useState } from 'react';
import './BoardGameNull.css';
const BoardGameNull = () => {
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center text-white p-6'>
            
            {/* Contenedor principal */}
            <div className="text-black bg-opacity-50 rounded-3xl shadow-2xl p-12 text-center animate__animated animate__fadeIn">
                
                <h1 className="text-6xl font-extrabold mb-6 animate__animated animate__fadeInDown">¡Bienvenido al Juego!</h1>
                
                <p className="text-2xl mb-10 animate__animated animate__fadeInUp">
                    Elige un modo para comenzar y demuestra tu habilidad 🎮
                </p>

                {/* Botones de modos de juego */}
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-xl font-bold px-8 py-4 rounded-full shadow-lg animate__animated animate__bounceIn">
                        Modo Puntuación
                    </button>
                    <button className="bg-orange-500 hover:bg-orange-400 transition-colors text-xl font-bold px-8 py-4 rounded-full shadow-lg animate__animated animate__bounceIn animate__delay-1s">
                        Modo Metrologia
                    </button>
                </div>

                <p className="mt-12 text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-3s">
                    ¡Buena suerte y que comience la diversión!
                </p>

            </div>
        </main>
    )
}



export default BoardGameNull