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

const DEFAULT_PARTIAL_BOOK_DEPTH_LEVEL = 10;
const combinedPartialBookDepthStreamBySymbol = (symbol) => `${symbol}@depth${DEFAULT_PARTIAL_BOOK_DEPTH_LEVEL}`

export function subscribePartialBookDepthStreams({ symbol, callback }) {
  subscribe({
    callback,
    stream: combinedPartialBookDepthStreamBySymbol(symbol),
  })
}

export function unsubscribePartialBookDepthStreams({ symbol, callback }) {
  unsubscribe({
    callback,
    stream: combinedPartialBookDepthStreamBySymbol(symbol),
  })
}
