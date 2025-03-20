import { ReactElement } from 'react'
import './App.scss'
import { Menu } from './components/Menu'
import { History } from './components/History'
import { useGameStore } from './stores/game-store'
import { Game } from './components/Game'

/**
 * Memory app
 *
 * @version 1.0
 * @author [Tymoteusz Huszcza] (https://github.com/TymoteuszMH)
 */

/**
 * App component - when game not started, showing menu, otherwise, show the game
 */
const App = (): ReactElement => {

  /**
   * Game Store from /stores/game-store.ts
   */
  const gameStore = useGameStore();

  /**
   * Render of Game or Menu
   */
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