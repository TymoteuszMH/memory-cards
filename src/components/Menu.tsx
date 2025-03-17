import { useHistoryStore } from "../stores/history-store";

export const Menu = () =>{
    const historyStore = useHistoryStore()
    
    return(
        <>
            <div className="card">
                <div className="card-body">
                    <h1>Welcome to Memory Game!</h1>
                    <div className={"actions"}>
                        <button>Start</button>
                        <button onClick={()=>{historyStore.toggleClass()}}>View History</button>
                    </div>
                </div>
            </div>
        </>
    );
}