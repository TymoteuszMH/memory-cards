import { create } from "zustand/react"

/**
 * Card type
 * @param {number} id - card's id
 * @param {string} name - tile name
 * @param {boolean} showed - state of card
 * @param {boolean} boolean - state of pair
 */
export type ICard = {
    id: number,
    name: string,
    showed: boolean,
    paired: boolean,
}

/**
 * Game type
 * @param {number} attempts - number of attempts
 * @param {number} gameDuration - game duration in secounds
 * @param {number} date - date of game in milisecounds
 */
export type Game = {
    attempts: number,
    gameDuration: number,
    date: number, 
}

/**
 * Game store - @extends Game
 * @param {boolean} started - state of game's begin
 * @param {boolean} ended - state of game's end
 * @param {ICard[]} cards - cards array
 * @param {(cardNumber: number) => void} startGame - beggining of game, setting cards and states
 *      @param {number} cardNumber - number of card to display
 * @param {() => void} endGame - func for ending game
 * @param {() => void} addTime - adding time
 * @param {(id: number) => void} setCard - selecting and matching card handler
 *      @param {number} id - id of card
 * @param {() => void} getGame - getting current game
 */
interface GameStoreProps extends Game{
    started: boolean,
    ended: boolean,
    cards: ICard[],
    startGame: (cardNumber: number) => void,
    endGame: () => void,
    addTime: () => void,
    setCard: (id: number) => void,
    getGame: () => Game
}

/**
 * Cards matcher
 * @param {ICard[]} cards - cards array
 * @param {number} id - current selected id
 * @returns cards array and state of attempt
 */
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

/**
 * RNG
 * @param {number} max - max range
 */
const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
}

/**
 * Getting random cards
 * @param {number} cardNumber - number of cards
 */
const randomCards = (cardNumber: number) =>{
    let cards: ICard[] = []
    let names: string[] = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h'];

    for(let i=0; i<cardNumber; i++){
        cards.push({id: i, name: names.splice(getRandomInt(cardNumber-i), 1)[0], showed: false, paired: false});
    }

    return cards;
}

/**
 * History store, used for saving and showing local games
 * @see GameStoreProps above
 */
export const useGameStore = create<GameStoreProps>((set, get)=>({
    started: false,
    ended: false, 
    attempts: 0, 
    gameDuration: 0, 
    date: Date.now(),
    cards: [],

    startGame: (cardNumber: number)=>{
        setTimeout(()=>{
            set((state)=>({
                ...state,
                started: true,
                ended: false, 
                attempts: 0, 
                gameDuration: 0, 
                date: Date.now(),
                cards: randomCards(cardNumber),
            }))
        }, 1000)
    },

    endGame: ()=>{
        set((state)=>({
            ...state,
            ended: true
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