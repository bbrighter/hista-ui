import { useState } from 'react'
import './App.css'

function App() {
  const [json, setJson] = useState<{ Resp: "" }>({ Resp: "" })


  const onClick = async () => {
    const resp = await fetch('https://staging-hista-api-dpc2.encr.app/test')
    const j = await resp.json()
    setJson(j)
  }


  return (
    <div>
      <button onClick={onClick}>Ruf die API!</button>
      <h2>{json["Resp"]}</h2>
    </div>
  )
}

export default App
