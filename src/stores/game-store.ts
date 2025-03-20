import { create } from "zustand/react"

export type ICard = {
    id: number,
    name: string,
    showed: boolean,
    paired: boolean,
}

export type Game = {
    attempts: number,
    gameDuration: number,
    date: number, 
}

interface GameStoreProps extends Game{
    started: boolean,
    ended: boolean,
    cards: ICard[],
    startGame: () => void,
    endGame: () => void,
    addAttempt: () => void,
    addTime: () => void,
    setCard: (id: number) => void,
    getGame: () => Game
}

const matchCards = (cards: ICard[], id: number) =>{
    if(cards[id].paired)
        return {cards: cards, attempt: false}
        
    cards[id].showed = !cards[id].showed

    let attempt = false;
    let match = cards.filter((card)=>card.showed && !card.paired)

    if(match.length > 1){
        attempt = true;

        cards.forEach((card)=>{
            if(match.includes(card))
                card.paired = card.showed = match[0].name == match[1].name
        })
    }


    return  {cards: cards, attempt: attempt}
}

const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
}

const randomCards = () =>{
    let cards: ICard[] = []
    let names: string[] = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h'];

    for(let i=0; i<=15; i++){
        cards.push({id: i, name: names.splice(getRandomInt(15-i), 1)[0], showed: false, paired: false});
    }

    return cards;
}

export const useGameStore = create<GameStoreProps>((set, get)=>({
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
                started: true,
                ended: false, 
                attempts: 0, 
                gameDuration: 0, 
                date: Date.now(),
                cards: randomCards(),
            }))
        }, 1000)
    },

    endGame: ()=>{
        set((state)=>({
            ...state,
            ended: true
        }))
        console.log(get().ended)
    },

    addAttempt: ()=>{
        set((state)=>({
            ...state,
            attempts: state.attempts + 1
        }))
    },

    addTime: ()=>{
        if(!get().ended)
            set((state)=>({
                ...state,
                gameDuration: state.gameDuration + 1
            }
    ))},

    setCard: (id: number)=>{
        let match = matchCards(get().cards, id)

        set((state)=>({
            ...state,
            cards: match.cards,
            attempts: match.attempt ? state.attempts + 1 : state.attempts
        }))

        let isEnded = match.cards.filter((card)=>!card.paired)
        if(isEnded.length < 1)
            set((state)=>({
                ...state,
                ended: true
            }))
    },

    getGame: ()=>{
        const game = get()
        return {
            attempts: game.attempts,
            gameDuration: game.gameDuration,
            date: game.date, 
        }
    }
}))