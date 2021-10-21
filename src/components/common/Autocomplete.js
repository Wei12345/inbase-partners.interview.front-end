export default function Autocomplete({ value, onChange, options }) {
  const showDatalist = value?.length > 1;
  return (
    <div className="Autocomplete">
      <input
        list="autocomplete-list"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      {showDatalist && (
        <datalist id="autocomplete-list">
          {options.map(({ label }) => (
            <option key={label} value={label} />
          ))}
        </datalist>
      )}
    </div>
  );
}
