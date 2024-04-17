import { useEffect, useState } from 'react'
import './App.css'

interface TodoItem {
  id: number
  title: string
  done: boolean
}

interface TodoItems {
  items: TodoItem[]
}

function App() {
  const [json, setJson] = useState<TodoItems>({ items: [] })
  const [todo, setTodo] = useState("")

  const url = 'https://staging-hista-api-dpc2.encr.app/test'
  // const url = 'http://localhost:9400/hista-api-at42/requests/test'
  useEffect(() => {
    fetch(url).then(
      resp => resp.json().then(
        j => setJson(j))
        .catch(() => setJson({ items: [] }))
    )
  }, [])



  const onClick = async () => {
    await fetch(url, {
      method: 'POST', body: JSON.stringify({ title: todo })
    })
  }

  return (
    <div>
      <input onChange={(e) => setTodo(e.target.value)} value={todo} />
      <button onClick={onClick}>Senden</button>
      {json.items.length > 0 &&
        <li>
          {
            json.items.map((j, i) => (<ul key={i}>{j.title}</ul>))
          }
        </li>
      }
    </div>
  )
}

export default App
