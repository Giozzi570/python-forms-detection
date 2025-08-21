export default function BeautifulCard({modificationGameParam, setModificationGameParam, selectedOptionParam, setSelectedOptionParam}) {
  return(
    <>
    {modificationGameParam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
                    <h2 className="font-bold text-black">Modificar modo de juego</h2>
                    <select value={selectedOptionParam} onChange={(e) => setSelectedOptionParam(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md text-black">
                        <option value="puntuacion">Puntuación</option>
                        <option value="metrologia">Metrología</option>
                    </select>
                    <button className="text-black px-4 py-2 rounded-md mt-4" onClick={() => setModificationGameParam(false)}>Cerrar</button>
                </div>
        </div>)}
    </>
  )
}