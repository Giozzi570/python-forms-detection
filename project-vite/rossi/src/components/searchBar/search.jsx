import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Llama a la función que recibe la búsqueda
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center bg-white rounded-2xl shadow-md p-2 w-full max-w-md"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="flex-grow p-2 outline-none rounded-l-2xl text-gray-700"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
