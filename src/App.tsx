import { ReactElement } from 'react'
import './App.scss'
import { Game } from './components/Game'

const App = (): ReactElement => {
  return (
    <>
    <div className='container'><Game/></div>
      
    </>
  )
}

export default App