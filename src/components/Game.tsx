import { ReactElement, useEffect } from "react"
import { Card } from "./Card";
import { useGameStore } from "../stores/game-store";

export const Game = (): ReactElement =>{
    const gameStore = useGameStore();

    const minutes = (t: number) =>{
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(14, 5);
    }

    const selectCard = (event: any, index?: number) =>{
        let el = event.target;
        el.classList = 'rotateOut'
        setTimeout(()=>{
            if(index)
                gameStore.setCard(index)
            el.classList = 'rotateIn'
        }, 500)
        return el.classList
    }

    useEffect(() => {
        const interval = setInterval(() => {
            gameStore.addTime();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="fadeIn container">
                <div className="stats">
                    <h1>{minutes(gameStore.gameDuration)}</h1>
                    <h1>{gameStore.attempts}</h1>
                </div>
                <div className={`board fadeIn`}>
                    {gameStore.cards.map((card, index)=>(
                        <Card card={card} index={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

