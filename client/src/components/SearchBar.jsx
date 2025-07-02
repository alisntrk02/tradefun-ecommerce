import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search..."
      className="text-center py-2 px-5 rounded-full outline-none bg-[#ffffff]"
    />
  );
}

export default SearchBar;
