export default function Progress({current, total, totalPoints, userPoints}) {
    return (
        <div className="progress">
            <progress value={current} max={total}></progress>
            <span>Question <strong>{current + 1}</strong> / {total}</span>
            <span><strong>{userPoints}</strong>/{totalPoints} points</span>
        </div>
    )
}