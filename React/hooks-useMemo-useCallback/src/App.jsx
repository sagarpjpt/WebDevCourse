import { useCallback, useMemo, useState } from "react"

function heavyFilter(data, query){
  for(let i = 0;i < 100000000;i++){}
  return data.filter(item => item.toLowerCase().includes(query.toLowerCase()))
}

function App() {

  const [query, setQuery] = useState('');
  const [data] = useState(['apple', 'grape', 'guava', 'banana', 'mango', 'water melon']);

  // memoize filtering function using useCallback
  const filterData = useCallback(() => {
    return heavyFilter(data, query)
  }, [data, query]); // only re run if query or data changes

  // call memoized function and cache result using useMemo
  const filtered = useMemo(() => filterData(), [filterData]);

  return (
    <div>
      <input type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="serach"
      />
      <br /><br />
      <ul>
        {
          filtered.map( (item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

export default App
