import { useMemo } from 'react';

import uniqueId from '../lib/uniqueId';

import Table from './common/Table';

export default function MarketDepth({ data }) {
  const COLUMNS = [
    {
      key: 'price',
      title: 'price'
    },
    {
      key: 'quantity',
      title: 'quantity'
    },
  ]

  const hasIdAsks = useMemo(() => {
    if (!data) {
      return null;
    }

    const { asks } = data;
    return asks.map(([price, quantity]) => ({
      id: uniqueId(),
      price,
      quantity
    }));
  }, [data])

  const hasIdBids = useMemo(() => {
    if (!data) {
      return null;
    }

    const { bids } = data;
    return bids.map(([price, quantity]) => ({
      id: uniqueId(),
      price,
      quantity
    }));
  }, [data])

  if (!data) {
    return null;
  }

  return (
    <>
      <Table columns={COLUMNS} data={hasIdAsks} />
      <Table columns={COLUMNS} data={hasIdBids} />
    </>
  )
}
