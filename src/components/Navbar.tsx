import { ReactElement, useEffect } from "react"
import { useGameStore } from "../stores/game-store";
import { useHistoryStore } from "../stores/history-store";
import { Time } from "./Time";

/**
 * Navbar component with stats
 * @returns all stats
 */
export const Navbar = (): ReactElement =>{

    /**
     * @var {GameStoreProps} gameStore - game store
     */
    const gameStore = useGameStore();

    /**
     * @var {HistoryStoreParam} historyStore - history store
     */
    const historyStore = useHistoryStore();

    /**
     * @var {number} interval - interval for time duration
     */
    let interval = 0;

    useEffect(() => {
        interval = setInterval(() => {
            gameStore.addTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    /** 
     * @condition 
     * clearing interval if game ends
     */
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

