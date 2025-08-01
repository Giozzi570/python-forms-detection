export const createElement = (name) => {
    let playerIdCounter = localStorage.getItem('playerIdCounter') || 0;
    playerIdCounter++;
    localStorage.setItem('playerIdCounter', playerIdCounter);
    // Crear el contenido HTML del nuevo jugador

    // Crear un objeto con la información que quieres guardar
    const playerData = name

    // Guardar la información del jugador en el localStorage
    localStorage.setItem('name', playerData);  // Guardar el array actualizado de jugadores
};
window.onload = () => {
    let players = JSON.parse(localStorage.getItem('players')) || [];

    players.forEach(player => {
        // Crear y renderizar cada jugador en el DOM
        let element = `<div class="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border flex flex-row gap-10 text-black border-gray-200" id="player-${player.name}">
            <div id="containerUser" class="flex flex-col items-center">
                <h3>Nombre</h3>
                <span>${player.name}</span>
            </div>
            <div id="containerUser" class="flex flex-row">
                <h3>Points</h3>
                <span id="points-${player.name}">${player.points}</span>
            </div>
            <div id="containerUser" class="flex flex-row">
                <h3>Positions</h3>
                <span id="positions-${player.name}">${player.positions.join(', ')}</span>
            </div>
        </div>`;

        // Añadir el jugador al DOM
        let Container = document.getElementById('containerPlayers');
        Container.innerHTML += element;
    });
};
