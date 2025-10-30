import React from "react";

function Tablero({pointsArray,points,setPoints,pri_param,seg_param,ter_param,cuar_param,qui_param,mode}){
    return(
        <div id='containerDistribution' className={`text-black m-4 rounded-3xl shadow-lg justify-center flex flex-col items-center p-4 gap-7 ${points ? 'h-auto' : ""}`}>
                <h3 className="font-black text-center">Distribución de Tolerancias</h3>
                <button className="bg-emerald-600" onClick={() => setPoints(!points)}>
                    {points ? "Ocultar Distribución de Tolerancias" : "Ver Distribución de Tolerancias"}
                </button>
            <div className={`w-auto h-auto justify-center items-center border-2 border-black p-5 rounded-3xl ${points ? 'grid' : 'hidden'}`} id='containerPointsPun'>
                        {pointsArray.map((num) => (
                            <div className="points-new" key={num} id={`${num}`}></div>
                        ))}
                    </div>
                    <div className={`w-auto flex-wrap h-auto justify-center items-center border-2 border-black p-5 rounded-3xl gap-4 ${points ? 'flex' : 'hidden'} animate__animated animate__fadeIn`}>
                        <div className='h-auto text-center bg-[#ff0000] rounded-full p-2' id='red'>{pri_param}{mode}</div>
                        <div className='h-auto text-center bg-[#FF9900] rounded-full p-2' id='orange'>{seg_param}{mode}</div>
                        <div className='h-auto text-center bg-[#FFFF00] rounded-full p-2' id='yellow'>{ter_param}{mode}</div>
                        <div className='h-auto text-center bg-[#008000] rounded-full p-2' id='dark-green'>{cuar_param}{mode}</div>
                        <div className='h-auto text-center bg-[#00fa0c] rounded-full p-2' id='light-green'>{qui_param}{mode}</div>
                    </div>
            </div>
    )
}

export default Tablero