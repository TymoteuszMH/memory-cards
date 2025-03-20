import { ReactElement } from "react"
import { useHistoryStore } from "../stores/history-store";
import { Time } from "./Time";

/** 
 * History of games
 * @returns game hostory table
 */
export const History = (): ReactElement =>{
    /** 
     * @var {HistoryStoreParam} historyStore - history store
     */
    const historyStore = useHistoryStore();

    /** 
     * @function toDate - changing secounds to date
     * @param {number} secounds
     * @returns {string} - date
     */
    const toDate = (secounds: number) =>{
        return Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(secounds);
    }

    return (<>
        <span id="history" className={`${historyStore.historyClass == 'show' ? 'fadeIn' : 'fadeOut'}`} onClick={()=>{historyStore.toggleClass()}}>
            <div className={`card ${historyStore.historyClass}`}  onClick={(event)=>event?.stopPropagation()}>
                <button onClick={()=>{historyStore.toggleClass()}}>x</button>

                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Attempts</th>
                            <th>Duration</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyStore.gamesHistory.map((game, index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{game.attempts}</td>
                                <td><Time time={game.gameDuration}/></td>
                                <td>{toDate(game.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </span>
    </>)
}

