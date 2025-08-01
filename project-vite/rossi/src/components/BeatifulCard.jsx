import React, { useState } from 'react';
import { FaUser, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { createElement } from '../logic/createElement';
import { Load } from './modals/modals';
import { useEffect } from 'react';
import CircleCursorFollow from './decoration/CircleCursorFollow';
import BoardGamePoints from './board/BoardGamePoints';
const BeautifulForm = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [Target, setTarget] = useState(false);

  const [hiddenLoad, setHiddenLoad] = useState(true)

  const [hiddenLoadSure, setHiddenLoadSure] = useState(true)

  const [hiddenError, setHiddenError] = useState(true)


  const HideErrorActive = `w-full h-screen flex justify-center items-center absolute ${hiddenError ? "hidden" : ""}`
  const hideLoadActiveSure = `w-full h-screen flex justify-center items-center absolute bg-transparent ${hiddenLoadSure ? "hidden" : ""}`
  const hideLoadActive = `w-full h-screen flex justify-center items-center absolute bg-transparent ${hiddenLoad ? "hidden" : ""}`
  
  const nameLocal = localStorage.getItem("name")
  async function guardarDatosEnBackend() {
    const datos = {
        name : localStorage.getItem('name'),
        id : localStorage.getItem('playerIdCounter')
    };
    try{
        setHiddenLoad(!hiddenLoad)
        const response = await fetch("http://localhost:5000/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),  // Envía el objeto completo
    })
    if (!response.ok) throw new Error("❌ Falló el guardado");

    } catch (error){
        localStorage.setItem("error",error)
        setHiddenLoad(true)
        setHiddenError(!HideErrorActive)
        console.log(error)
    }

}
  const buttonHiddenError = () => {
      setHiddenError(!hiddenError)
      localStorage.removeItem("error")
  }
  const buttonHiddenLoad = () => {
    setHiddenLoadSure(!hiddenLoadSure)
    guardarDatosEnBackend()
    
  }
  const buttonHiddenLoadCancel = () => {
    setHiddenLoadSure(true)
  }
  
  function functionFetch(name,bool,target,hiddenLoadSure){
    createElement(name)
    setSubmitted(bool);
    setTarget(!target)
    setHiddenLoadSure(!hiddenLoadSure)
    setTimeout(() => {
      setSubmitted(false);
      setName('');
    }, 1000);
  }

  const handleSubmit = () => {
    if (!name.trim()) return;
    functionFetch(name,true,Target,hiddenLoadSure)
  }
  
  const buttonBase =
    'w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95';
  const buttonColors = submitted
    ? 'bg-emerald-600'
    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600';

  return (
    <div className="min-h-screen w-full flex flex-row-reverse items-center justify-around bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <BoardGamePoints/>
      <div className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 grow">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-8">
          Ingresa tu Nombre
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 text-lg rounded-xl border-2 transition-all text-black duration-300 focus:outline-none focus:ring-4"
            placeholder="Escribe tu nombre aquí..."
          />
          <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-300 text-black" />
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className={`${buttonBase} ${buttonColors}`}
        >
          {submitted ? (
            <>
              <FaCheck className="mr-2" /> Enviado!
            </>
          ) : (
            <>
              Enviar <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
                <div class="max-w-md mx-auto mt-8 p-6 bg-white text-black shadow-lg rounded-xl border flex flex-row gap-10 justify-center border-gray-200" >
                    <div id='containerUser' class="flex flex-col items-center text-wrap">
                        <h3>Nombre</h3>
                        <span>{name}</span>
                    </div>
                </div>
      </div>
          <Load hideLoadActiveSureParam={hideLoadActiveSure}
              buttonHiddenLoadParam={buttonHiddenLoad}
              buttonHiddenLoadCancelParam={buttonHiddenLoadCancel}
              hideLoadActiveParam={hideLoadActive}
              nameLocalParam={nameLocal}
              HideErrorActiveParam={HideErrorActive}
              setHiddenErrorParam={buttonHiddenError}></Load>
</div>


  );
};

export default BeautifulForm;
