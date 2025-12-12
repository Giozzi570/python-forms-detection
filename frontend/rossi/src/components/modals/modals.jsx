import React from "react";
import './ProgressBarLoadingScreen.css'
import SpinnerLoadingScreen from "./modalLoad";
import Cellphone from "/typeCellphone.png";
import Web from "/typeWeb.png";
export const Load = ({hideLoadActiveSureParam , nameLocalParam,tiempoDeEspera,tiempoDeFuncion,tiempoDeSubida, buttonHiddenLoadParam, buttonHiddenLoadCancelParam , hideLoadActiveParam , HideErrorActiveParam ,setHiddenErrorParam, hiddenDetecActiveParam, setHiddenDetecParam, HiddenCameraParam, PermiCameraParam, PermiCameraWebParam }) => {
  return(
    <>

    <div className={hideLoadActiveSureParam}>
                    <div className="flex flex-col w-80 h-80 bg-white text-black rounded-xl p-10 gap-8">
                        <p className="text-center font-bold">¿ Esta seguro de que su nombre es {nameLocalParam} ?</p>
                         <button id="cancelButton" onClick={buttonHiddenLoadParam} class="overflow-hidden group px-6 py-3 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Aceptar </button>
                         <button id="cancelButton" onClick={buttonHiddenLoadCancelParam} class="overflow-hidden group px-6 py-3 rounded-full font-bold text-white bg-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40"> Cancelar </button>
                    </div>
        </div>
        <div className={hideLoadActiveParam}>
                    <div className="flex flex-col w-80 h-80 bg-white text-black rounded-xl p-10 gap-8">
                        <p className="text-center font-bold">Estamos en proceso de detectar sus fichas {nameLocalParam}</p>
                        <SpinnerLoadingScreen/>
                    </div>
        </div>
        <div className={HideErrorActiveParam}>
            <div className="flex flex-col justify-center h-80 w-80 bg-white text-black rounded-xl p-10 gap-8 ">
            <p className="text-center font-bold text-xl">❌ Error </p>
            <p className="text-center font-bold">{localStorage.getItem("error")}</p>
            <span className="text-center font-bold text-xl">Intente de vuelta</span>
            <button id="cancelButton" onClick={setHiddenErrorParam} class="overflow-hidden group px-6 py-3 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40">Aceptar</button>
        </div>
        </div>
            <div className={hiddenDetecActiveParam}>
                <div className="flex flex-col items-center justify-center w-80 bg-white text-gray-900 rounded-2xl p-8 shadow-lg space-y-6">
                  <img width={100} height={100} src="../si.png" alt="Éxito" className="drop-shadow-md" />

                  <h2 className="text-center text-2xl font-semibold">
                    Fichas detectadas correctamente, <span className="font-bold text-blue-600">{nameLocalParam}</span>.
                  </h2>

                  <p className="text-center text-lg">
                    Espero que haya disfrutado el juego.
                  </p>

                  <p className="text-center text-lg font-bold text-blue-600">
                    Puntaje: {localStorage.getItem("puntaje")}
                  </p>
                  <p className="text-center text-lg font-bold text-black">Su tiempo hasta detectar fichas fue de {tiempoDeEspera - (tiempoDeFuncion + tiempoDeSubida)} ms</p>
                  <p className="text-center text-lg font-bold text-black">La función de detección tardó {tiempoDeFuncion} ms</p>
                  <p className="text-center text-lg font-bold text-black">Su tiempo para subir las cosas a la base de datos fue de {tiempoDeSubida} ms</p>
                  <button
                    id="cancelButton"
                    onClick={setHiddenDetecParam}
                    className="px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    Finalizar intento
                  </button>
                </div>
              </div>

    </>
    )
}
