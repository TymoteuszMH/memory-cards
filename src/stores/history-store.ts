import { create } from "zustand/react"
import { Game } from "./game-store"

type Store = {
    historyClass: string,
    gamesHistory: Game[],
    saveGame: (game: Game)=>void,
    loadGames: ()=>void,
    toggleClass: ()=>void
}

export const useHistoryStore = create<Store>((set, get)=>({
    historyClass: 'hidden',
    gamesHistory: [],
    saveGame: (game: Game)=>{
        set((state)=>({
            ...state, 
            gamesHistory: [...state.gamesHistory, game]
        }));
        localStorage.setItem('gameList', JSON.stringify(get().gamesHistory))
    },
    loadGames: ()=>{
        set((state)=>({
            ...state, 
            gamesHistory: JSON.parse(localStorage.getItem('gameList') || "[]")
        }))
    },
    toggleClass: () => {
        set((state)=>({
            ...state, 
            historyClass: state.historyClass == 'show' ? 'hide' : 'show'
        }))
    }
}))