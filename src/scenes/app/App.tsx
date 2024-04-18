import { useEffect, useState } from 'react'
import './App.css'

import useHista from '../../store/store'
import { AppBar, Button, Container, List, ListItem, TextField, Toolbar } from '@mui/material'
import { login } from '../../api/api'



function App() {
  const todoItems = useHista(state => state.todoItems)
  const get = useHista(state => state.get)
  const post = useHista(state => state.post)

  const [todo, setTodo] = useState("")
  const [pw, setPw] = useState("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { get() }, [])
  console.log(window.sessionStorage, window.sessionStorage.getItem("token"))

  const onClick = async () => { await post(todo) }
  const onLogin = async () => {
    await login(pw)
  }


  return (
    <>
      <AppBar>
        <Toolbar>
          <TextField label="Enter Password" value={pw} onChange={e => setPw(e.target.value)} />
          <Button onClick={() => onLogin()}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: '4rem' }}>
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
