import { useState } from "react";
import { useHistoryStore } from "../stores/history-store";

export const Menu = () =>{
    const historyStore = useHistoryStore();

    const [isHistory, setIsHistory] = useState('hidden')
    const toggleClass = () => {
        setIsHistory(isHistory == 'show' ? 'hide' : 'show')
    }
    
    return(
        <>
            <div className="card">
                <div className="card-body">
                    <h1>Welcome to Memory Game!</h1>
                    <div className={"actions"}>
                        <button>Start</button>
                        <button onClick={()=>{toggleClass()}}>View History</button>
                    </div>
                </div>
            </div>
            
            <span id="history">
                <div className={`card ${isHistory}`}>
                    dziala
                </div>
            </span>


        </>
    );
}