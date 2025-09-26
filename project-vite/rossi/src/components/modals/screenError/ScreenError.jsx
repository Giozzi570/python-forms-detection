export default function ScreenError({hiddenError, refreshJugadores,error}) {
  return (
   <div
     className={`fixed inset-0 bg-white text-black flex items-center justify-center z-50 transition-opacity duration-300 ${
       hiddenError ? "hidden" : ""
     }`}
   >
     <div className="flex flex-col items-center justify-center gap-6 text-center animate-fade-in px-6">
       
       <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide drop-shadow-xl">
         Upps, Hemos tenido un Error al cargar jugadores
       </h1>
   
       <p className="text-lg sm:text-xl text-gray-700 max-w-md">
         Lo sentimos, pero no pudimos cargar la información de los jugadores.
       </p>
   
       <button
         onClick={refreshJugadores}
         className="mt-4 px-6 py-3 text-lg font-semibold bg-white text-red-700 hover:bg-gray-100 transition rounded-xl shadow-lg"
       >
         Reintentar
       </button>
   
       <p className="text-sm text-gray-400 mt-4 italic">Código de error: 503 — Servicio no disponible</p>
       <p className="text-sm text-gray-400 mt-4 italic">Tipo de error: {error}</p>
   
     </div>
   </div>
   
  );
}
