import React from "react";
import { useState } from "react";
import Arrow from "../../../assets/arrow.svg";
export default function BeautifulCard({modificationGameParam, setModificationGameParam, selectedOptionParam, setSelectedOptionParam}) {
  const [selectedOption, setSelectedOption] = useState("Puntuacion");
  localStorage.setItem('TypeGame', selectedOption);
  const toggleOption = () => {
    setSelectedOption((prev) =>
      prev === "Puntuacion" ? "Metrologia" : "Puntuacion"
    );
    localStorage.setItem('TypeGame', selectedOption === "Puntuacion" ? "Metrologia" : "Puntuacion");
    
  };
  return(
    <>
    {modificationGameParam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col justify-center items-center">
                    <h2 className="font-bold text-black">Modificar modo de juego</h2>
                    <div className="flex items-center gap-4 mt-4 justify-between">
                      <div className="transform scale-x-[-1] cursor-pointer hover:bg-gray-200 p-5 rounded-xl" onClick={() => toggleOption()}>
                        <img src={Arrow} className="" width={30} alt="arrow" />
                      </div>
                      <div>
                        <h4 className="text-black font-bold">{selectedOption}</h4>
                      </div>
                      <div className="cursor-pointer hover:bg-gray-200 p-5 rounded-2xl" onClick={toggleOption}>
                        <img src={Arrow} className="" width={30} alt="arrow" />
                      </div>
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setModificationGameParam(false)}>Guardar Cambios</button>
                </div>
        </div>)}
    </>
  )
}