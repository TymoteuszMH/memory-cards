import { ReactElement, useEffect } from "react"
import { Card } from "./Card";
import { useGameStore } from "../stores/game-store";
import { Navbar } from "./Navbar";

export const Game = (): ReactElement =>{
    const gameStore = useGameStore();

    return (
        <>
            <div className="fadeIn">
                <Navbar/>
                <div className="board">
                    {gameStore.cards.map((card, index)=>(
                        <Card card={card} index={index} key={card.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}

