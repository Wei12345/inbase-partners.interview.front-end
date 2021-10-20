export default function Autocomplete({ value, onChange, options }) {
  const showDatalist = value?.length > 1;
  return (
    <div className="SymbolSelector">
      <input
        list="symbol-selector"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      {showDatalist && (
        <datalist id="symbol-selector">
          {options.map(({ label }) => (
            <option key={label} value={label} />
          ))}
        </datalist>
      )}
    </div>
  );
}
