import React, { useRef } from "react";
import Cellphone from "/typeCellphone.png";
import Web from "/typeWeb.png";
import "./Test.css";

function ModalTypeCamera() {
  const videoRef = useRef(null); // referencia al <video>

  async function PermiCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video : {facingMode: "environment"}, audio : false});
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // asigna el stream
      }
    } catch (err) {
      console.error("Error al abrir la cámara:", err);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className="p-10 bg-black"
        autoPlay
        playsInline
      ></video>
      <div className="text-black flex-col text-black shadow-2xl rounded-2xl flex items-center justify-center h-80 w-80 m-auto p-2">
        <div className="text-center pb-6">¿Con qué tipo de cámara quiere jugar?</div>
        <div className="flex gap-3">
          <div>
            <button onClick={PermiCamera}>
              <img className="rounded-sm" src={Cellphone} alt="Celphone" />
            </button>
          </div>
          <div>
            <button>
              <img className="rounded-sm" src={Web} alt="Webcam" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalTypeCamera;
