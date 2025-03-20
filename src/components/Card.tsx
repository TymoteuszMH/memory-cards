

import { ReactElement, useState } from "react"
import { ICard, useGameStore } from "../stores/game-store";

/**
 * type for Card
 * @param { ICard } card - card to show
 */
type CardProp = {
    card: ICard,
}

/**
 * Card module
 * @returns card
 */
export const Card = ({card}: CardProp):ReactElement=>{
    /**
     * @var {GameStoreProps} gameStore - game store
     */
    const gameStore = useGameStore();

    /** 
     * @var {boolean} clicked - state of card clicked
     * @function setClicked - state setter
     */
    const [clicked, setClicked] = useState(false);

    /** 
     * @var {string} photo - state of photo src
     * @function setPhoto - state setter
     */
    const [photo, setPhoto] = useState("./back_red.png");

    /** 
     * @var {string} imgClass - class of img
     * @function setImgClass - state setter
     */
    const [imgClass, setImgClass] = useState("");

    /**
     * @var {string} front - src of front of card
     */
    const front = `./${card.name}_rev.png`

    /**
     * @var {string} back - src of back of card
     */
    const back = `./back_red.png`

    /**
     * @var {string} rotIn - class of rotateIn
     */
    const rotIn = 'rotateIn'

    /**
     * @var {string} rotOut - class of rotateOut
     */
    const rotOut = 'rotateOut'

    /**
     * @function selectCard - selecting card
     */
    const selectCard = () =>{
        if(card.paired || clicked)
            return undefined;

        setClicked(true)
        setImgClass(rotOut)
        setTimeout(()=>{
            gameStore.setCard(card.id)
        }, 500)
    }

    /**
     * @condition
     * if card is rotate out, changing photo src and rotating in
     */
    if(imgClass == rotOut){
        setTimeout(()=>{
            setPhoto(photo == back ? front : back)
            setImgClass(rotIn)  
            setTimeout(()=>{  
                setClicked(false)        
            }, 500)
        }, 500)
    }

    /**
     * @condition
     * card should be rotated, rotating it out
     */
    if((!card.showed && imgClass != rotOut && photo != back) || (card.showed && imgClass != rotOut && photo != front)){
        setTimeout(()=>{
            if(!clicked)
                setImgClass(rotOut)
        }, 500)
    }

    return (
        <>
            <a className="game-card" onClick={()=>{selectCard()}}>
                <img id={`${card.id}`} className={imgClass} src={photo}/>
            </a>
        </>
    )
}

