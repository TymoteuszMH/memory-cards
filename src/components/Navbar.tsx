import { ReactElement, useEffect } from "react"
import { useGameStore } from "../stores/game-store";

export const Navbar = (): ReactElement =>{
    const gameStore = useGameStore();

    const minutes = (t: number) =>{
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(14, 5);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(!gameStore.ended)
                gameStore.addTime();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="stats">
                <h1></h1>
                <h1>{minutes(gameStore.gameDuration)}</h1>
                <h1>Attempts: {gameStore.attempts}</h1>
            </div>
        </>
    )
}

