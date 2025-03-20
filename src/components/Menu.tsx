import { useState } from "react";
import { useGameStore } from "../stores/game-store";
import { useHistoryStore } from "../stores/history-store";

/** 
 * Menu component
 * @return menu
 */
export const Menu = () =>{
    /** 
     * @var {string} cardClass - state of card's class
     * @function setCardClass - state setter
     */
    const [cardClass, setCardClass] = useState('fadeIn');

    /** 
     * @var {GameStoreProps} gameStore - game store
     */
    const historyStore = useHistoryStore()

    /** 
     * @var {HistoryStoreParam} historyStore - history store
     */
    const gameStore = useGameStore()

    return(
        <>
            <div className={`card ${cardClass}`}>
                <div className="card-body">
                    <h1>Welcome to Memory Game!</h1>
                    <div className={"actions"}>
                        <button onClick={()=>{setCardClass('fadeOut'); gameStore.startGame(8)}}>Eazy</button>
                        <button onClick={()=>{setCardClass('fadeOut'); gameStore.startGame(12)}}>Medium</button>
                        <button onClick={()=>{setCardClass('fadeOut'); gameStore.startGame(16)}}>Hard</button>
                        <button onClick={()=>{historyStore.toggleClass()}}>View History</button>
                    </div>
                </div>
            </div>
        </>
    );
}