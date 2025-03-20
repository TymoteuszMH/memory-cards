

import { ReactElement, useEffect, useState } from "react"
import { ICard, useGameStore } from "../stores/game-store";
import { useHistoryStore } from "../stores/history-store";

type CardProp = {
    card: ICard,
    index: number
}

export const Card = ({card}: CardProp):ReactElement=>{
    const gameStore = useGameStore();
    const historyStore = useHistoryStore();

    const [photo, setPhoto] = useState("./back_red.png");
    const [imgClass, setImgClass] = useState("");

    const selectCard = (index: number) =>{
        if(card.paired)
            return undefined;

        setImgClass('rotateOut')
        setTimeout(()=>{
            setPhoto(card.showed ? "./back_red.png":`./${card.name}_rev.png`)
            setImgClass('rotateIn')
            gameStore.setCard(index)
        }, 500)
    }

    if((card.paired || card.showed) && photo != `./${card.name}_rev.png`){
        setPhoto(`./${card.name}_rev.png`)
        setImgClass('rotateIn')
    }

    if(!card.showed && imgClass != 'rotateOut' && photo == `./${card.name}_rev.png`){
        setTimeout(()=>{
            setImgClass('rotateOut')
            setTimeout(()=>{
                setPhoto("./back_red.png")
                setImgClass('rotateIn')
            }, 500)
        }, 500)
    }

    return (
        <>
            <a className="game-card" onClick={()=>{selectCard(card.id)}}>
                <img id={`${card.id}`} className={imgClass} src={photo}/>
            </a>
        </>
    )
}

