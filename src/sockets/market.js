import { subscribe, unsubscribe } from "./index";

const combinedAggregateTradeStreamBySymbol = (symbol) => `${symbol}@aggTrade`

export function subscribeAggregateTradeStreams({ symbol, callback }) {
  subscribe({
    callback,
    stream: combinedAggregateTradeStreamBySymbol(symbol),
  })
}

export function unsubscribeAggregateTradeStreams({ symbol, callback }) {
  unsubscribe({
    callback,
    stream: combinedAggregateTradeStreamBySymbol(symbol),
  })
}
