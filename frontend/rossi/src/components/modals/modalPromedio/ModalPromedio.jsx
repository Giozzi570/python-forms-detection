function ModalPromedio({setModal}) {
    return (
    <div className="fixed inset-0 flex gap-4 flex-col items-center bg-black/60 backdrop-blur-sm mx-auto justify-center z-50 text-black">
        <div className="grid grid-cols-1 grid-rows-2 gap-4 flex-col items-center w-4/6 mx-auto justify-center z-50 text-black">
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-3xl border-4 border-double">
                <h3 className="text-xl font-bold">Puntaje</h3>
                <p>1. Promedio el puntaje tomando todas las jugadas de todos los jugadores</p>
                <a className="flex justify-end" href="documentacion#puntaje"><button className="font-bold py-2 px-4 rounded">¿Como se promedia?</button></a>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-3xl border-4 border-double">
                <h3 className="text-xl font-bold">Posiciones</h3>
                <p>2. Promedio cuántas veces cayó una ficha en cada cuadrado considerando todas las partidas.</p>
                <a className="flex justify-end" href="documentacion#nombresyposiciones"><button className="font-bold py-2 px-4 rounded">¿Como se promedia?</button></a>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-3xl border-4 border-double">
                <h3 className="text-xl font-bold">Nombres</h3>
                <p>3. Promedio cuántas veces aparece cada nombre contando a todos los jugadores.</p>
                <a className="flex justify-end" href="documentacion#nombresyposiciones"><button className="font-bold py-2 px-4 rounded">¿Como se promedia?</button></a>
            </div>
        </div>
            <button onClick={() => setModal(false)} className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-600">Cerrar</button>
    </div>
    )
}

export default ModalPromedio