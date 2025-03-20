import { create } from "zustand/react"
import { Game } from "./game-store"

type Store = {
    historyClass: string,
    gamesHistory: Game[],
    gameSaved: boolean,
    newGame: ()=>void,
    saveGame: (game: Game)=>void,
    toggleClass: ()=>void
}

export const useHistoryStore = create<Store>((set, get)=>({
    historyClass: 'hidden',
    gamesHistory: JSON.parse(localStorage.getItem('gameList') || "[]"),
    gameSaved: false,
    newGame: ()=>{
        set((state)=>({
            ...state, 
            gameSaved: false,
        }));
    },
    saveGame: (game: Game)=>{
        set((state)=>({
            ...state, 
            gameSaved: true,
            gamesHistory: [...state.gamesHistory, game]
        }));
        localStorage.setItem('gameList', JSON.stringify(get().gamesHistory))
    },
    toggleClass: () => {
        set((state)=>({
            ...state, 
            historyClass: state.historyClass == 'show' ? 'hide' : 'show'
        }))
    }
}))