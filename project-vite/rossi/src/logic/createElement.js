export const createElement = (name) => {
    // Crear el contenido HTML del nuevo jugador

    // Crear un objeto con la información que quieres guardar
    const playerData = name

    // Guardar la información del jugador en el localStorage
    localStorage.setItem('name', playerData);  // Guardar el array actualizado de jugadores
};
export const PlayerIdCounter = () => {
    let playerIdCounter = 1
    playerIdCounter = parseInt(localStorage.getItem('playerIdCounter'), 10) || 0;
    playerIdCounter++;
    localStorage.setItem('playerIdCounter', playerIdCounter);
}
export const SelectGameFunction = (TypeGame) => {
    // Crear el contenido HTML del nuevo jugador

    // Crear un objeto con la información que quieres guardar
    const TypeGameSelected = TypeGame
    console.log(TypeGameSelected)
    // Guardar la información del jugador en el localStorage
    localStorage.setItem('TypeGame', TypeGameSelected);  // Guardar el array actualizado de jugadores
};