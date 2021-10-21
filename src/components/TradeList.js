import { useMemo } from 'react';

import uniqueId from '../lib/uniqueId';

import Table from './common/Table';

export default function TradeList({ data }) {
  const COLUMNS = [
    {
      key: 'time',
      title: 'time',
      format: (time) => {
        const date = new Date(time);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      }
    },
    {
      key: 'price',
      title: 'price'
    },
    {
      key: 'quantity',
      title: 'quantity'
    },
  ]

  const hasIdData = useMemo(() => (data.map(item => ({
    id: uniqueId(),
    ...item
  }))), [data])

  if (!data || data.length === 0) {
    return null;
  }

  return <Table columns={COLUMNS} data={hasIdData} />
}
