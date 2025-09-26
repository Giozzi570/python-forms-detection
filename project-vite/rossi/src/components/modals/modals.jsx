import React from "react";
import './ProgressBarLoadingScreen.css'
import SpinnerLoadingScreen from "./modalLoad";

export const Load = ({hideLoadActiveSureParam , nameLocalParam, buttonHiddenLoadParam, buttonHiddenLoadCancelParam , hideLoadActiveParam , HideErrorActiveParam ,setHiddenErrorParam, hiddenDetecActiveParam, setHiddenDetecParam}) => {
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
                <div className="flex flex-col justify-center h-auto w-80 bg-white text-black rounded-xl p-10 gap-8 items-center">
                <img width={100} height={100} src="../si.png" alt="" />
                <span className="text-center font-bold text-xl">Se han termindo de detectar sus fichas {nameLocalParam}</span>
                <span className="text-center font-bold text-xl">Espero que le haya gustado el juego</span>
                <button id="cancelButton" onClick={setHiddenDetecParam} class="overflow-hidden group px-6 py-3 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40">Finalizar intento</button>
            </div>
            </div>
    </>
    )
}
