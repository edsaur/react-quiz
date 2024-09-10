import { useEffect } from "react"

export default function Timer({state, dispatch}) {
    const minute = Math.floor(state.time/60);
    const seconds = state.time % 60;

    useEffect(function(){
     const id = setInterval(function(){
            dispatch({type: "countdown"})
        }, 1000);

    return ()=> clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {minute < 10 && "0"}{minute}:{seconds < 10 && '0'}{seconds}
        </div>
    )
}
