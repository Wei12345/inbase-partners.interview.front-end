const BASE_URL = 'https://api.binance.com/api/v3';

export async function getExchangeInformation() {
  const url = `${BASE_URL}/exchangeInfo`;
  const response = await fetch(url);
  const data = await response.json()
  return data;
}
