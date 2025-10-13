import React, { useState } from "react";
import Cellphone from "/typeCellphone.png";
import Web from "/typeWeb.png";
import "./Test.css";

function ModalTypeCamera() {
  const [imageBase64, setImageBase64] = useState("");

  async function PermiCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error al abrir la cámara:", err);
    }
  }

  function CapturarImagen() {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    // tamaño del canvas igual al del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // obtiene el string base64
    const dataUrl = canvas.toDataURL("image/png");
    setImageBase64(dataUrl);
    const data_url_python = dataUrl.split(",")[1]
    localStorage.setItem("data_text_image",data_url_python)
    console.log("Imagen en base64:", data_url_python); // podés usarla o enviarla a un backend
  }

  return (
    <div className="flex flex-col items-center justify-center m-5 gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-80 h-60 rounded-lg shadow-md border border-gray-300"
      />
      <div className="text-black shadow-2xl rounded-2xl flex flex-col items-center justify-center h-80 w-80 p-2">
        <div className="text-center pb-6">
          ¿Con qué tipo de cámara quiere jugar?
        </div>
        <div className="flex gap-3">
          <button onClick={PermiCamera}>
            <img className="rounded-sm" src={Cellphone} alt="Celphone" />
          </button>
          <button>
            <img className="rounded-sm" src={Web} alt="Webcam" />
          </button>
        </div>
      </div>

      <button
        onClick={CapturarImagen}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        Capturar imagen (Base64)
      </button>

      {imageBase64 && (
        <div className="mt-4 w-80 text-center">
          <p className="text-sm break-words">
            <strong>Base64:</strong>
          </p>
          <textarea
            readOnly
            value={imageBase64}
            className="w-full h-40 p-2 border rounded text-xs bg-gray-100"
          />
          <img
            src={imageBase64}
            alt="captura"
            className="mt-3 w-60 rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default ModalTypeCamera;

