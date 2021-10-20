import uniqueId from '../lib/uniqueId';

const URL = 'wss://stream.binance.com:9443/ws';

const subscribes = [];

const generatorOnmessageByStream = (stream) => (e) => {
  const data = JSON.parse(e.data)

  if (Object.prototype.hasOwnProperty.call(data, 'id') && Object.prototype.hasOwnProperty.call(data, 'result')) {
    return;
  }

  const subscribeIndex = findSubscribedIndexByStream(stream);
  if (subscribeIndex === -1) {
    return
  }

  subscribes[subscribeIndex].callbacks.forEach((callback) => {
    callback(data);
  })
}

const findSubscribedIndexByStream = (stream) => subscribes.findIndex(({ stream: subscribeStream }) => subscribeStream === stream)

const isSubscribedByStream = (stream) => {
  return findSubscribedIndexByStream(stream) > -1;
}

export function subscribe({ stream, callback }) {
  if (isSubscribedByStream(stream)) {
    const subscribeIndex = findSubscribedIndexByStream(stream);

    const callbackIndex = subscribes[subscribeIndex].callbacks.findIndex((subscribedCallback) => subscribedCallback === callback)
    if (callbackIndex > -1) {
      return;
    }

    subscribes[subscribeIndex].callbacks.push(callback);
    return;
  }

  const socket = new WebSocket(URL);

  subscribes.push({
    socket,
    stream,
    callbacks: [callback]
  })

  socket.onmessage = generatorOnmessageByStream(stream);
  socket.onopen = () => {
    const subscribeData = {
      method: "SUBSCRIBE",
      params: [stream],
      id: Number(uniqueId()),
    }
    socket.send(JSON.stringify(subscribeData));
  }
}

export function unsubscribe({ stream, callback }) {
  if (!isSubscribedByStream(stream)) {
    return;
  }

  const subscribeIndex = findSubscribedIndexByStream(stream);

  const callbackIndex = subscribes[subscribeIndex].callbacks.findIndex((subscribedCallback) => subscribedCallback === callback)
  if (callbackIndex > -1) {
    subscribes[subscribeIndex].callbacks.splice(callbackIndex, 1);
  }

  if (subscribes[subscribeIndex].callbacks.length === 0) {
    const { socket } = subscribes[subscribeIndex];
    socket.close();

    subscribes.splice(subscribeIndex, 1)
  }
}
