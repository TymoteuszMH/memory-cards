import { create } from "zustand/react"

type Card = {
    card: string,
    showed: boolean,
    paired: boolean,
}

export type Game = {
    started: boolean,
    ended: boolean,
    cards: Card[],
    attempts: number,
    gameDuration: number,
    date: number, 
    startGame: () => void,
    addAttempt: () => void,
    addTime: () => void,
}

const randomReverce = () =>{
    return [];
}

const randomCards = () =>{
    let cards: Card[] = []
    for(let i=0; i<16; i++){
        cards.push({card: '', showed: false, paired: false})
    }
    return cards;
}

export const useGameStore = create<Game>((set)=>({
    started: false,
    ended: false, 
    attempts: 0, 
    gameDuration: 0, 
    date: Date.now(),
    cards: randomCards(),

    startGame: ()=>{
        setTimeout(()=>{
            set((state)=>({
                ...state,
                started: true
            }))
        }, 1000)
    },

    addAttempt: ()=>{set((state)=>({
        ...state,
        attempts: state.attempts + 1
    }))},

    addTime: ()=>{set((state)=>({
        ...state,
        gameDuration: state.gameDuration + 1
    }))},
}))