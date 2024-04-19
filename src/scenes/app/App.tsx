import { useEffect, useState } from 'react'
import './App.css'

import useHista from '../../store/store'
import { Button, Container, List, ListItem, TextField } from '@mui/material'


function App() {
  const todoItems = useHista(state => state.todoItems)
  const get = useHista(state => state.get)
  const post = useHista(state => state.post)

  const [todo, setTodo] = useState("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { get() }, [])

  const onClick = async () => { await post(todo) }



  return (
    <>
      <Container sx={{ mt: '1rem' }}>
        <TextField onChange={e => setTodo(e.target.value)} value={todo} label={"Enter Todo"} />
        <Button onClick={onClick}>Senden</Button>
        {todoItems.length > 0 && <List>
          {
            todoItems.map(j => (<ListItem key={j.id}>{j.title}</ListItem>))
          }
        </List>}
      </Container>
    </>
  )
}

export default App
