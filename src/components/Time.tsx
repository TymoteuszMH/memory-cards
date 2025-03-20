import { ReactElement } from "react"

type TimeProp = {
    time: number
}

export const Time = ({time}: TimeProp): ReactElement =>{
    const minutes = (t: number) =>{
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(14, 5);
    }

    return (
        <>
            {minutes(time)}
        </>
    )
}

