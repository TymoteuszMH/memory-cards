import { ReactElement } from "react"
import { useGameStore } from "../stores/game-store";

export const Game = (): ReactElement =>{
    const gameStore = useGameStore();
    return (
        <>
            <div className={`board fadeIn`}>
                    {gameStore.cards.map((card)=>(
                        <a className="game-card">
                        </a>
                    ))}
            </div>
        </>
    )
}

