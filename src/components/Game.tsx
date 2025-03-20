import { ReactElement } from "react"
import { Card } from "./Card";
import { useGameStore } from "../stores/game-store";
import { Navbar } from "./Navbar";
import { History } from "./History";
import { useHistoryStore } from "../stores/history-store";

export const Game = (): ReactElement =>{
    const gameStore = useGameStore();
    const historyStore = useHistoryStore();

    if(gameStore.ended && !historyStore.gameSaved)
        historyStore.saveGame(gameStore.getGame())
    if(!gameStore.ended && historyStore.gameSaved)
        historyStore.newGame()

    return (
        <>
            <div className="fadeIn h-100">
                <History/>
                <Navbar/>
                {historyStore.gameSaved ? 
                        <div className={`startNewGame ${gameStore.ended ? 'fadeIn' : 'fadeOut'}`}>
                            <button onClick={()=>{gameStore.startGame()}}>Start new game</button>
                        </div>
                    : <></>}
                <div className="board">
                    {gameStore.cards.map((card, index)=>(
                        <Card card={card} index={index} key={card.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}

