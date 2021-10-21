import { useState, useCallback, useEffect, useMemo, useRef } from 'react';

import Autocomplete from "./components/common/Autocomplete";
import MarketDepth from "./components/MarketDepth";
import TradeList from "./components/TradeList";

import { getExchangeInformation } from './apis/market-data';
import {
  subscribeAggregateTradeStreams,
  unsubscribeAggregateTradeStreams,
  subscribePartialBookDepthStreams,
  unsubscribePartialBookDepthStreams,
} from './sockets/market';

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

  const [marketDepth, setMarketDepth] = useState(null);
  const partialBookDepthStreamsCallback = useCallback((data) => {
    const clonedBids = data?.bids ? [...data.bids] : [];
    clonedBids.sort(([aPrice, _], [bPrice, __]) => Number(bPrice) - Number(aPrice))

    const clonedAsks = data?.asks ? [...data.asks] : []
    clonedAsks.sort(([aPrice, _], [bPrice, __]) => Number(bPrice) - Number(aPrice))

    setMarketDepth({
      bids: clonedBids,
      asks: clonedAsks
    })
  }, [])

  const tradesRef = useRef([]);
  const [trades, setTrades] = useState([]);
  const aggregateTradeStreamsCallback = useCallback((data) => {
    const clonedTrades = [...tradesRef.current];
    clonedTrades.push({
      quantity: data.q,
      price: data.p,
      time: data.T
    });
    clonedTrades.sort((a, b) => b.time - a.time)

    const DEFAULT_MAX_LENGTH = 50;
    if (clonedTrades.length > DEFAULT_MAX_LENGTH) {
      clonedTrades.length = DEFAULT_MAX_LENGTH;
    }

    setTrades(clonedTrades)
    tradesRef.current = clonedTrades;
  }, []);

  const [symbol, setSymbol] = useState('');
  const handleSymbolChange = useCallback((value) => {
    setSymbol(value)
    setTrades([])
    setMarketDepth(null)
  }, []);

  const lowerCaseSymbol = symbol.toLowerCase();

  useEffect(() => {
    subscribeAggregateTradeStreams({
      symbol: lowerCaseSymbol,
      callback: aggregateTradeStreamsCallback,
    });

    return () => {
      unsubscribeAggregateTradeStreams({
        symbol: lowerCaseSymbol,
        callback: aggregateTradeStreamsCallback,
      });
    }
  }, [lowerCaseSymbol, aggregateTradeStreamsCallback])

  useEffect(() => {
    subscribePartialBookDepthStreams({
      symbol: lowerCaseSymbol,
      callback: partialBookDepthStreamsCallback,
    });

    return () => {
      unsubscribePartialBookDepthStreams({
        symbol: lowerCaseSymbol,
        callback: partialBookDepthStreamsCallback,
      });
    }
  }, [lowerCaseSymbol, partialBookDepthStreamsCallback])

  return (
    <>
      <Autocomplete
        value={symbol}
        onChange={handleSymbolChange}
        options={symbolAutocompleteOptions}
      />
      <h1>Market Depth 上Ask 下 Bid</h1>
      <MarketDepth
        data={marketDepth}
      />
      <h1>Trade List</h1>
      <TradeList
        data={trades}
      />
    </>
  )
}

export default App;
