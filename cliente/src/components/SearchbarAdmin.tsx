export default function Searchbar({ onSearch }: any) {
  return (
    <div className="searchbar">
      <div className="flex justify-center align-center">
        <input
          className="searchbar__input"
          type="text"
          placeholder="Buscar productos..."
          onChange={(e) => {
            onSearch(e.target.value); // Llama a la función onSearch pasada como prop, pasando el valor del input
          }}
        />

        <button className="searchbar__icon-right" aria-label="Buscar">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 20l-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
