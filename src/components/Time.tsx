import { ReactElement } from "react"

/**
 * Time prop
 *
 * @param {number} time - time in milisecounds
 */
type TimeProp = {
    time: number
}

/**
 * Time
 * @uses TimeProp
 */
export const Time = ({time}: TimeProp): ReactElement =>{

    /**
     * Changing number of secounds to minutes type
     *
     * @param {number} t - numer of secounds
     */
    const minutes = (t: number) =>{
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(11, 8);
    }

    /**
     * returns minutes
     */
    return (
        <>
            {minutes(time)}
        </>
    )
}

