export default function Results({state, dispatch}) {
    return (
        <>
        <p className="result">You've scored {state.userPoints} over {state.totalPoints} </p>
        <button className="btn btn-ui" onClick={() => dispatch({type:"reset"})}>Reset</button>
        </>
    )
}