import { create } from "zustand/react"
import { Game } from "./game-store"

type Store = {
    gamesHistory: Game[],
    saveGame: (game: Game)=>void,
    loadGames: ()=>void
}



export const useHistoryStore = create<Store>((set, get)=>({
    gamesHistory: [],
    saveGame: (game: Game)=>{
        set((state)=>({...state, gamesHistory: [...state.gamesHistory, game]}))
        localStorage.setItem('gameList', JSON.stringify(get().gamesHistory))
    },
    loadGames: ()=>{
        set((state)=>({...state, gamesHistory: JSON.parse(localStorage.getItem('gameList') || "[]")}))
    },
}))