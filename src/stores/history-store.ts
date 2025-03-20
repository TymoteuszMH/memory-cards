import { create } from "zustand/react"
import { Game } from "./game-store"


/**
 * Store type
 * @param {string} hisotryClass - state of history card visibility
 * @param {Game[]} gamesHistory - whole history
 * @param {boolean} gameSaved - state of game saving
 * @param {()=>void} newGame - handler for starting new game
 * @param {(game: Game)=>void} saveGame - saving game to localstorage
 *      @param {Game} game - game to be saved
 * @param {()=>void} toggleClass - handler to change state of history card visibility
 */
type HistoryStoreParam = {
    historyClass: string,
    gamesHistory: Game[],
    gameSaved: boolean,
    newGame: ()=>void,
    saveGame: (game: Game)=>void,
    toggleClass: ()=>void
}

/**
 * History store, used for saving and showing local games
 * @see HistoryStoreParam above
 */
export const useHistoryStore = create<HistoryStoreParam>((set, get)=>({
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