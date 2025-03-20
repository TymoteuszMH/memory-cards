import { ReactElement } from "react"
import { Card } from "./Card";
import { useGameStore } from "../stores/game-store";
import { Navbar } from "./Navbar";
import { History } from "./History";
import { useHistoryStore } from "../stores/history-store";

/**
 * Game site
 * @return game board with navbar
 */
export const Game = (): ReactElement =>{
    /**
     * @var {GameStoreProps} gameStore - game store
     */
    const gameStore = useGameStore();
    
    /** 
     * @var {HistoryStoreParam} historyStore - history store
     */
    const historyStore = useHistoryStore();

    /**
     * @condition
     * if game ended, but isn't saved, forcing saving
     */
    if(gameStore.ended && !historyStore.gameSaved)
        historyStore.saveGame(gameStore.getGame())

    /**
     * @condition
     * reseting game saved status after starting a game
     */
    if(!gameStore.ended && historyStore.gameSaved)
        historyStore.newGame()

    return (
        <>
            <div className="fadeIn h-100">
                <History/>
                <Navbar/>
                {historyStore.gameSaved ? 
                        <div className={`startNewGame ${gameStore.ended ? 'fadeIn' : 'fadeOut'}`}>
                            <button onClick={()=>{gameStore.startGame(8)}}>Eazy</button>
                            <button onClick={()=>{gameStore.startGame(12)}}>Medium</button>
                            <button onClick={()=>{gameStore.startGame(16)}}>Hard</button>
                        </div>
                    : <></>}
                <div className="board">
                    {gameStore.cards.map((card)=>(
                        <Card card={card} key={card.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}

