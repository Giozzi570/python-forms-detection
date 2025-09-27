import React from "react";
import Cellphone from "/typeCellphone.png"
import Web from "/typeWeb.png"
import "./Test.css"


function PermiCamera(){
  navigator.mediaDevices.getUserMedia()
}
function ModalTypeCamera(){
  return(
    <>
    <video id="video"></video>
    <div className="text-black flex-col text-black shadow-2xl rounded-2xl flex items-center justify-center h-80 w-80 m-auto p-2">
      <div className="text-center pb-6">¿Con que tipo de camara quiere jugar?</div>
      <div className="flex gap-3">
        <div><button onClick={PermiCamera}><img className="rounded-sm" src={Cellphone} alt="Celphone" /></button></div>
        <div><button><img className="rounded-sm" src={Web} alt="Webcam"/></button></div>
      </div>
    </div>
    </>
  )
}

export default ModalTypeCamera