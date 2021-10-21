export default function MarketDepth({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ title, key }) => (
            <td key={key}>{title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map(({ key, format }) => (
              <td key={`${item.id}${key}`}>{format ? format(item[key]) : item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
