import { useState } from "react";


export default function SelectGame({ modificationGameParam, setModificationGameParam}) {


  return (
    <>
    <button onClick={() => setModificationGameParam(!modificationGameParam)} className="bg-blue-500 text-white py-2 px-4 rounded">
      Seleccionar modo de juego
    </button>
    </>  );
}

