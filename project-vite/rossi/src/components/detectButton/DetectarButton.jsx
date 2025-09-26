import React from "react";
import "../detectButton/DetectarButton.css"
const DetectarButton = () => {
  const detectarButton = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "GET"
      });
      const data = await response.json();
      localStorage.setItem("Resultado",data);
      console.log("✅ Resultado:", data);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <button id="ButtonDetect" className="w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95" onClick={detectarButton}>Detectar</button>
  );
};

export default DetectarButton;

/*
Explicación del codigo;

Primero, se crea una función llamada DetectarButton. Adentro de esta función,
se crea otra función async(asincrona) llamda detectarButton, que quiere decir que sea asincrona que hasta que el
await no detecte ningún dato no avanza el codigo, despues de que el try agarre datos desde http://localhost:5000/
sigue con el codigo y crea una data donde es un json y hasta que el codigo no haga este json el codigo no avanza.
El catch por otra parte hace que si por alguna razón hay algun bug o error manda manda a la consola un msg de error.
Por ultimo, la función retorna un button que activa la funcion detectarButton y se exporta como default. Significa 
que este componente (DetectarButton) es el valor principal que se exporta de este archivo, y por eso se puede importar 
en otro lugar así:
import DetectarButton from "./DetectarButton";
Si usás export default, no necesitás poner llaves {} al importarlo para pode usarse en diferentes componente

*/