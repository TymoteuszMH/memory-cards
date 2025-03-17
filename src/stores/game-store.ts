import { create } from "zustand/react"

export type Game = {
    ended: boolean,
    attempts: number,
    gameDuration: number,
    date: number, 
    addAttempt: () => void,
    addTime: () => void,
}

export const useGameStore = create<Game>((set)=>({
    ended: false, 
    attempts: 0, 
    gameDuration: 0, 
    date: Date.now(),

    addAttempt: ()=>{set((state)=>({
        ...state,
        attempts: state.attempts + 1
    }))},

    addTime: ()=>{set((state)=>({
        ...state,
        gameDuration: state.gameDuration + 1
    }))},
}))