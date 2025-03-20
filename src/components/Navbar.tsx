import { ReactElement, useEffect } from "react"
import { useGameStore } from "../stores/game-store";
import { useHistoryStore } from "../stores/history-store";
import { Time } from "./Time";

export const Navbar = (): ReactElement =>{
    const gameStore = useGameStore();
    const historyStore = useHistoryStore();
    let interval = 0;

    useEffect(() => {
        interval = setInterval(() => {
            gameStore.addTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if(gameStore.ended){
        clearInterval(interval);
    }

    return (
        <>
            <div className="stats">
                <span><button onClick={()=>{historyStore.toggleClass()}}>View History</button></span>
                <h1>
                    <Time time={gameStore.gameDuration}/>
                </h1>
                <span>Attempts: {gameStore.attempts}</span>
            </div>
        </>
    )
}

