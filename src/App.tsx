import { ReactElement } from 'react'
import './App.scss'
import { Menu } from './components/Menu'
import { History } from './components/History'
import { useGameStore } from './stores/game-store'
import { Game } from './components/Game'

const App = (): ReactElement => {
  const gameStore = useGameStore();

  if(gameStore.started){
    return (
      <>
        <Game/>
      </>
    );
  }else{
    return (
      <>
        <div className='container'>
          <Menu/>
          <History/>
        </div>
      </>
    )
  }
}

export default App