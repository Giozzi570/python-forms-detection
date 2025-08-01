import React from "react";

const jugadoresActivos = [
  { id: 1, nombre: "Lionel Messi", equipo: "Inter Miami" },
];

const jugadoresRetirados = [
  { id: 3, nombre: "Juan Román Riquelme", puntaje: "500"},
  { id: 4, nombre: "Gabriel Batistuta", puntaje: "400"},
  { id: 4, nombre: "Gabriel Batistuta", puntaje: "600"},
  { id: 4, nombre: "Gabriel Batistuta", puntaje: "700"},
  { id: 4, nombre: "Gabriel Batistuta", puntaje: "500"}
];
const jugadoresActivosOrdenados = [...jugadoresActivos].sort((a, b) => b.puntaje - a.puntaje);
const jugadoresRetiradosOrdenados = [...jugadoresRetirados].sort((a, b) => b.puntaje - a.puntaje);

const Players = () => {
  return (
    <>
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Jugadores</h2>

      {/* Activos */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-4">🟢 Activos</h3>
        <div className="grid gap-4">
          {jugadoresActivosOrdenados.map((jugador) => (
            <div key={jugador.id} className="p-4 border border-green-200 rounded-lg shadow-sm hover:shadow-md transition">
              <p className="font-medium">{jugador.nombre}</p>
              <p className="text-sm text-gray-500">{jugador.equipo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retirados */}
      <div>
        <h3 className="text-xl font-semibold text-gray-600 mb-4">⚫ Finalizados</h3>
        <div className="grid gap-4">
          {jugadoresRetiradosOrdenados.map((jugador) => (
            <div key={jugador.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
              <p className="font-medium text-gray-800">{jugador.nombre}</p>
              <p className="text-sm text-gray-600">{jugador.equipo}</p>
              <p className="text-sm text-gray-400">{jugador.puntaje}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default  Players;
