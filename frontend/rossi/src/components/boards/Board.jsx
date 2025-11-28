import React from "react";
import "./Board.css"
function Board({ pointsArray, points, setPoints, pri_param, seg_param, ter_param, cuar_param, qui_param, mode, circles, medidas}) {
    return (
        <div id='containerDistribution' className={`text-black m-4 rounded-3xl shadow-lg justify-center flex flex-col items-center p-4 gap-7 ${points ? 'h-auto' : ""}`}>
            <h3 className="font-black text-center">Distribución del Tablero</h3>
            <div className="flex items-center gap-28">
                 <div className={`w-auto h-auto relative justify-center items-center border-2 border-black p-[15px] rounded-3xl ${points ? 'grid' : 'hidden'}`} id='containerPointsPun'>
                {pointsArray.map((num) => (
                    <div className="points-new" key={num} id={`${num}`}></div>
                ))}
                {circles}
                {medidas && <main>
                <div>
                    <div className="w-[42.5px] bg-yellow-500 border-1 border-black rounded-full absolute" style={{ top: "42.5px", left: "0px" }}></div>
                </div>
                 <div>
                    <div className="h-[42.5px] bg-yellow-500 border-1 border-black rounded-full absolute" style={{ top: "0px", left: "42.5px" }}></div>
                </div>
                </main>}
                {medidas && <div>
                <div className="w-[350px] h-[4px] absolute flex flex-col gap-4 items-center border-2 border-black bg-black rounded-3xl shadow-lg" style={{ top: "-25px", left: "15px"}}>
                    <p className="text-start rotate-180 font-black">350px</p>
                </div>
                <div className="w-auto absolute flex flex-col gap-4 border-2 border-black  rounded-3xl bg-white shadow-lg" style={{ top: "0px", left: "0px"}}></div>
                <div className="w-[4px] h-[467.568px] absolute flex flex-col gap-4 border-2 border-black justify-center  rounded-3xl bg-black shadow-lg" style={{ top: "15px", left: "-25px"}}>
                    <p className="rotate-180 font-black">467.568px</p>
                </div>
            </div>}
            </div>
            {medidas && <div className="w-auto h-auto relative flex flex-col gap-4 border-2 border-black p-6 rounded-3xl bg-white shadow-lg">
                <h2 className="text-xl font-black text-center border-b pb-2">Datos del círculo</h2>

                <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-xl">
                    <h3 className="font-black text-lg text-center">Medidas</h3>
                    <p className="text-sm">Posición X: 42.5px</p>
                    <p className="text-sm">Posición Y: 42.5px</p>
                </div>

                <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm font-black">Puntaje:</p>
                    <p className="text-sm font-black">ID:</p>
                    <p className="text-sm font-black">Color: Rojo</p>
                </div>
                </div>
                }
            </div>

            <div className={`w-auto flex-wrap h-auto justify-center items-center border-2 border-black p-5 rounded-3xl gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeIn`}>
                <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>{pri_param}{mode}</div>
                <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>{seg_param}{mode}</div>
                <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>{ter_param}{mode}</div>
                <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='dark-green'>{cuar_param}{mode}</div>
                <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='light-green'>{qui_param}{mode}</div>
            </div>
        </div>
    )
}

export default Board