import React from "react";
import { useState } from "react";

function ModalFinish() {
    const [hiddenfinish, setHiddenFinish] = useState(false)
    const hiddenfinishActive = `w-full h-screen flex justify-center items-center absolute bg-transparent ${hiddenfinish ? "hidden" : ""}`

    return (
        <div className={hiddenfinishActive}>
            <div className="flex flex-col justify-center h-auto w-80 bg-white text-black rounded-xl p-10 gap-8 items-center">
            <img width={100} height={100} src="../si.png" alt="" />
            <span className="text-center font-bold text-xl">Se han termindo de detectar sus fichas {name}</span>
            <span className="text-center font-bold text-xl">Espero que le haya gustado el juego</span>
            <button id="cancelButton" onClick={setHiddenFinish} class="overflow-hidden group px-6 py-3 rounded-full font-bold text-white bg-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40">Finalizar intento</button>
        </div>
        </div>
    )
}
// { setHiddenFinish , hiddenfinish }

export default ModalFinish;