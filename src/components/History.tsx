import { ReactElement } from "react"
import { useHistoryStore } from "../stores/history-store";

export const History = (): ReactElement =>{
    const historyStore = useHistoryStore();
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
                            <tr>
                                <td>{index}</td>
                                <td>{game.attempts}</td>
                                <td>{game.gameDuration}</td>
                                <td>{game.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </span>
    </>)
}

