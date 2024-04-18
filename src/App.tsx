import { useEffect, useState } from 'react'
import './App.css'

import useHista from './store/store'



function App() {
  const todoItems = useHista(state => state.todoItems)
  const get = useHista(state => state.get)
  const post = useHista(state => state.post)

  const [todo, setTodo] = useState("")

  useEffect(() => { get() }, [])


  const onClick = async () => { await post(todo) }

  return (
    <div>
      <input onChange={(e) => setTodo(e.target.value)} value={todo} />
      <button onClick={onClick}>Senden</button>
      {todoItems.length > 0 &&
        <li>
          {
            todoItems.map(j => (<ul key={j.id}>{j.title}</ul>))
          }
        </li>
      }
    </div>
  )
}

export default App
