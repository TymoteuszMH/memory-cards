import { useState } from "react";
import { useGameStore } from "../stores/game-store";
import { useHistoryStore } from "../stores/history-store";

export const Menu = () =>{
    const [cardClass, setCardClass] = useState('fadeIn');
    const historyStore = useHistoryStore()
    const gameStore = useGameStore()

    return(
        <>
            <div className={`card ${cardClass}`}>
                <div className="card-body">
                    <h1>Welcome to Memory Game!</h1>
                    <div className={"actions"}>
                        <button onClick={()=>{setCardClass('fadeOut'); gameStore.startGame()}}>Start</button>
                        <button onClick={()=>{historyStore.toggleClass()}}>View History</button>
                    </div>
                </div>
            </div>
        </>
    );
}