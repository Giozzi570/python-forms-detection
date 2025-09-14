import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 🔥 llama automáticamente al escribir
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-full max-w-md 
                    focus-within:ring-2 focus-within:ring-blue-400 transition">
      <Search className="text-gray-400 w-5 h-5 mr-2" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar..."
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
