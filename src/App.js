import { useState, useCallback, useEffect, useMemo } from 'react';
import Autocomplete from "./components/Autocomplete";
import { getExchangeInformation } from './apis/market-data';

function App() {
  const [symbols, setSymbols] = useState([]);
  const symbolAutocompleteOptions = useMemo(() => symbols.map(({ symbol }) => ({ label: symbol })), [symbols])

  useEffect(() => {
    const fetchExchangeInformation = async () => {
      const exchangeInformation = await getExchangeInformation();
      setSymbols(exchangeInformation.symbols);
    }
    fetchExchangeInformation()
  }, [])

  const [symbol, setSymbol] = useState('');
  const handleSymbolChange = useCallback((value) => {
    setSymbol(value)
  }, []);

  return (
    <>
      <Autocomplete
        value={symbol}
        onChange={handleSymbolChange}
        options={symbolAutocompleteOptions}
      />
    </>
  )
}

export default App;
