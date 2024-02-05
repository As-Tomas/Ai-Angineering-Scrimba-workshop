import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReActAgent from './components/reAct_Agent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
        <ReActAgent />
      </div>
      
    </>
  )
}

export default App
