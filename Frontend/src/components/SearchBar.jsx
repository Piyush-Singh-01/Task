import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        size={16}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm 
                   outline-none transition-all duration-200 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}

export default SearchBar;
