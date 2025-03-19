import { create } from "zustand/react"

export type ICard = {
    id: number,
    name: string,
    showed: boolean,
    paired: boolean,
}

export type Game = {
    started: boolean,
    ended: boolean,
    cards: ICard[],
    attempts: number,
    gameDuration: number,
    date: number, 
    startGame: () => void,
    endGame: () => void,
    addAttempt: () => void,
    addTime: () => void,
    setCard: (id: number) => void,
}

const matchCards = (cards: ICard[], id: number) =>{
    if(!cards[id].paired)
        cards[id].showed = !cards[id].showed

    let attempt = false;
    let match = cards.filter((card)=>card.showed && !card.paired)

    cards.forEach((card)=>{
        if(match.length > 1 && match.includes(card)){
            attempt = true;
            card.showed = card.paired = match[0].name == match[1].name
        }
    })

    return {cards: cards, attempt: attempt}
}

const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
}

const randomCards = () =>{
    let cards: ICard[] = []
    let names: string[] = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h'];

    for(let i=15; i>=0; i--){
        cards.push({id: i, name: names.splice(getRandomInt(i), 1)[0], showed: false, paired: false});
    }

    return cards;
}

export const useGameStore = create<Game>((set, get)=>({
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

    endGame: ()=>{
        set((state)=>({
            ...state,
            ended: true
        }))
    },

    addAttempt: ()=>{set((state)=>({
        ...state,
        attempts: state.attempts + 1
    }))},

    addTime: ()=>{set((state)=>({
        ...state,
        gameDuration: state.gameDuration + 1
    }))},

    setCard: (id: number)=>{
        let state = get();
        let match = matchCards(state.cards, id)

        if(match.attempt){
            state.addAttempt()
            let isEnded = match.cards.filter((card)=>!card.paired)
            if(isEnded.length == 0)
                state.endGame()
        }

        set(()=>({
            ...state,
            cards: match.cards
        }))
    }
}))