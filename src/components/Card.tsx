

import { ReactElement } from "react"
import { ICard, useGameStore } from "../stores/game-store";

type CardProp = {
    card: ICard,
    index: number
}

export const Card = (card: ICard, index: number):ReactElement<CardProp> =>{
    const gameStore = useGameStore();

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

    return (
        <>
            <a className="game-card" onClick={()=>{selectCard(event, index)}}>
                <img src={card.showed || card.paired ? `./${card.name}_rev.png` : "./back_red.png"}/>
            </a>
        </>
    )
}

