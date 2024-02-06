import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Assistant from './components/assistant'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Assistant />
    </>
  )
}

export default App
