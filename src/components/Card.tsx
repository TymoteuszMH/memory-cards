

import { ReactElement, useState } from "react"
import { ICard, useGameStore } from "../stores/game-store";

type CardProp = {
    card: ICard,
    index: number
}

export const Card = ({card}: CardProp):ReactElement=>{
    const gameStore = useGameStore();

    const [photo, setPhoto] = useState("./back_red.png");
    const [imgClass, setImgClass] = useState("");

    const selectCard = (index: number) =>{
        if(card.paired)
            return undefined;

        setImgClass('rotateOut')
        setTimeout(()=>{
            gameStore.setCard(index)
        }, 500)
    }

    if(imgClass == 'rotateOut' && photo == "./back_red.png"){
        setTimeout(()=>{
            setPhoto(`./${card.name}_rev.png`)
            setImgClass('rotateIn')        
        }, 500)

    }

    if(!card.showed && imgClass != 'rotateOut' && photo != `./back_red.png`){
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

