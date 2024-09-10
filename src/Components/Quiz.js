import { useQuiz } from "./useQuiz";
import Loader from "./Loader";
import Progress from "./Progress";
import Error from "./Error";
import Timer from "./Timer";

export default function Quiz({ state, dispatch }) {
  useQuiz(dispatch);

  // Ensure questions and answers are defined before accessing them
  const currentQuestion = state.questions?.[state.currentQuestion];
  const currentAnswers = state.answers?.[state.currentQuestion];
  const isLastQuestion = state.currentQuestion >= state.questions.length - 1;

  console.log("This is the status", state.status); // Debugging log to check status

  const handleNextQuestion = () => {
    dispatch({ type: "hasAnswered", hasAnswered: false });
    if (!isLastQuestion) {
      dispatch({ type: 'nextQuestion' });
    } else {
      dispatch({ type: 'hasFinished', isFinished: true });
    }
  };

  function handleAnswer(index) {
    dispatch({ type: "hasAnswered", hasAnswered: true });
    if (index === state.correctAnswer[state.currentQuestion]) {
      dispatch({ type: "userAddPoints", addUserPoints: state.points[state.currentQuestion] + state.userPoints });
      console.log("Correct!");
    }
  }

  // Check for loading or error status before rendering the quiz

  return (
    <div className="start">
    {state.status === 'loading' && <Loader />}
    {state.status === 'error' && <Error />}
    {
      state.status === "ready" && (
        <>
          <h2>Welcome to the React Quiz!</h2>
          <h3>{state.questions.length} questions to test your React mastery</h3>
          <button className="btn" onClick={() => dispatch({ type: 'startQuiz' })}>
            Let's Start!
          </button>
        </>
      )
    }
      {state.status === "active" && (
        <div>
          <Progress
            current={state.currentQuestion}
            total={state.questions.length}
            totalPoints={state.totalPoints}
            userPoints={state.userPoints}
          />
          <h2>{currentQuestion}</h2>
          <div className="options">
            {currentAnswers.map((answer, index) => {
              return (
                <button key={index} className={`btn btn-option ${state.hasAnswered ? index === state.correctAnswer[state.currentQuestion] ? "correct answer" : "wrong" : "" }`} onClick={() => handleAnswer(index)} disabled={state.hasAnswered}>
                  {answer}
                </button>
              );
            })}
          </div>  
          <Timer state={state} dispatch={dispatch} />
          {state.hasAnswered && (
            <button className="btn btn-ui" onClick={handleNextQuestion}>
              {isLastQuestion ? "Finish" : "Next Question"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
