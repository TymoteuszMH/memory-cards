import { ReactElement } from 'react'
import './App.scss'
import { Menu } from './components/Menu'
import { History } from './components/History'

const App = (): ReactElement => {
  return (
    <>
      <div className='container'>
        <Menu/>
        <History/>
      </div>
    </>
  )
}

export default App