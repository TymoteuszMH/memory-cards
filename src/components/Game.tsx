import { ReactElement } from "react"
import { useGameStore } from "../stores/game-store";
import { Menu } from "./Menu";

export const Game = (): ReactElement =>{
    const gameStore = useGameStore();
    return (<>
        <Menu/>
    </>)
}

