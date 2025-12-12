import React from "react";
import "./Board.css"
import ErrorPromedio from "./boardEstadisticas/ErrorPromedio";

function Board({ pointsArray,mostrarPoints, Id, circlePuntaje,circulosMostrar, Color,error, vivo,names, PedirInfoCantidadPosiciones, estadisticas, posicionElegida,puntaje, points, setPoints, setMedidas, ids, actualizado, pri_param, seg_param, ter_param, cuar_param, qui_param, mode, circles, Setmedidas, medidas, radio, posicionX, posicionY, handleInfo }) {

    return (
        <div id='containerDistribution' className={`text-black m-4 rounded-3xl shadow-lg justify-center flex flex-col items-center p-4 gap-7 ${points ? 'h-auto' : ""}`}>
            <h3 className="font-black text-center">Distribución del Tablero</h3>
            <div className={`flex ${estadisticas ? 'flex-row' : 'flex-col'} items-center w-full justify-around`}>
                {vivo && <><p className="font-black text-black">{actualizado}</p>
                    <p className="font-black text-black">puntaje: {puntaje}</p></>}
                <div className="flex flex-row gap-30 items-center">
                    <div className={`w-auto h-auto relative justify-center items-center border-2 border-black p-[15px] rounded-3xl ${points ? 'grid' : 'hidden'}`} id='containerPointsPun'>
                        {pointsArray.map((num) => (
                            <div className="points-new" onClick={() => PedirInfoCantidadPosiciones(num)} key={num} id={`${num}`}></div>
                        ))}
                        {circulosMostrar && circles.map((circle, i) => (
                            <div
                                onClick={() => handleInfo(circle)}
                                onDoubleClick={() => setMedidas(false)}
                                className="cursor-pointer w-[55px] h-[55px] bg-yellow-500 border-4 border-black rounded-full absolute hover:bg-yellow-800 text-center font-black rotate-180"
                                style={{
                                    top: `${-(circle[0] + 15) + (84 + 468)}px`,
                                    left: `${circle[1] - 78 - 15}px`,
                                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L61 39 H98 L68 59 L79 93 L50 73 L21 93 L32 59 L2 39 H39 Z' fill='gold' stroke='black' stroke-width='6'/></svg>")`,
                                    backgroundSize: "80% 80%",
                                    backgroundAttachment: "fixed",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            >
                            </div>
                        ))}

                        {medidas && <main>
                            <div>
                                <div className={` border-3 border-[#fff] border-dashed absolute`} style={{ top: `${posicionY + 5.5 - 4}px`, left: "15px", width: `${posicionX + 5.5 - 13}px` }}></div>
                            </div>
                            <div>
                                <div className={` border-3 border-[#fff] border-dashed absolute`} style={{ top: "15px", left: `${posicionX + 5.5 - 4}px`, height: `${posicionY + 5.5 - 13}px` }}></div>
                            </div>
                        </main>}
                        {medidas && <div>
                            <div className="w-[350px] h-[4px] absolute flex flex-col gap-4 items-center border-2 border-black bg-black rounded-3xl shadow-lg" style={{ top: "-25px", left: "15px" }}>
                                <p className="text-start rotate-180 font-black">350px   {Math.round(350 * 0.16285714285 * 100) / 100}cm</p>
                            </div>
                            <div className="w-[4px] h-[467.568px] absolute flex flex-col gap-4 border-2 border-black justify-center  rounded-3xl bg-black shadow-lg" style={{ top: "15px", left: "-25px" }}>
                                <p className="rotate-180 font-black">467.568px</p>
                                <p className="rotate-180 font-black">{Math.round(467.568 * 0.16285714285 * 100) / 100}cm</p>
                            </div>
                        </div>}
                    </div>
                    {medidas && <div className="w-auto h-auto relative flex flex-col gap-4 border-2 border-black p-6 rounded-3xl bg-white shadow-lg">
                        <h2 className="text-xl font-black text-center border-b pb-2">Datos del círculo</h2>

                        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-xl">
                            <h3 className="font-black text-lg text-center">Medidas</h3>
                            <p className="text-sm">Posición X: {posicionX}px/ {Math.round(posicionX * 0.16285714285 * 100) / 100}cm</p>
                            <p className="text-sm">Posición Y: {posicionY}px/{Math.round(posicionY * 0.16285714285 * 100) / 100}cm</p>
                            <p>Diametro: {49.12}px/{Math.round(49.12 * 0.16285714285 * 100) / 100}cm</p>
                        </div>

                        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-xl">
                            <p className="text-sm font-black">Puntaje: {circlePuntaje}</p>
                            <p className="text-sm font-black">ID: {Id}</p>
                            <p className="text-sm font-black">Color: {Color}</p>
                        </div>
                    </div>
                    }
                </div>
                {mostrarPoints &&<div className={`w-auto flex-wrap h-auto justify-center items-center border-2 border-black p-5 rounded-3xl mt-4 gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeIn`}>
                        <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>{pri_param}{mode}</div>
                        <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>{seg_param}{mode}</div>
                        <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>{ter_param}{mode}</div>
                        <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='dark-green'>{cuar_param}{mode}</div>
                        <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='light-green'>{qui_param}{mode}</div>
                    </div>}
                {estadisticas && <aside className="text-black p-6">
                    <h2 className="text-xl font-black text-center border-b pb-2">Estadísticas</h2>
                    <div className="flex flex-col gap-4">
                        <p>Cantidad de veces que se repite: {posicionElegida ?? 0}</p>
                        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-xl overflow-y-auto">
                            <h3 className="font-black text-lg text-center">Nombres</h3>
                            {names.map((n, i) => (
                                <p href={`partidas#${n}`} target="_blank" className="text-center font-bold" key={i}>{n}</p>
                            ))}
                        </div>
                        <p>Promedio de los puntajes totales: {puntaje}</p>
                    </div>
                    {error && <ErrorPromedio />}
                </aside>}
            </div>
        </div >
    )
}

export default Board