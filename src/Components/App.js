import { useReducer } from "react";
import Header from "./Header";
import Quiz from "./Quiz";
import Results from "./Results";

const initialState = { 
  hasStart: false, 
  
  questions: [], 
  currentQuestion: 0, 
  
  answers: [], 
  correctAnswer: [], 
  points:null, 
  userPoints: 0,
  
  progress: null, 
  isLoading: false, 
  selectedAnswer: null, 
  hasAnswered: false,
  finished: false,

  time: null,

  status: 'loading'

};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "startQuiz":
      return { ...state, hasStart: true, status: 'active'};  // Start the quiz by setting hasStart to true
    case "hasError":
      return { ...state, status: 'error' };  // Start the quiz by setting hasStart to true

    case "questions":
      return {...state, questions: action.questions, status: 'ready', time: state.questions.length * SECS_PER_QUESTION};
    case "nextQuestion":
      return { ...state, currentQuestion: state.currentQuestion + 1, hasAnswered: false, selectedAnswer: null };

    case "answers":
      return {...state, answers: action.answers};
    case "correctAnswer":
      return {...state, correctAnswer: action.correctAnswer};
    case "hasAnswered":
      return { ...state, hasAnswered: action.hasAnswered};

    case "points":
      return {...state, points: action.points, totalPoints: action.totalPoints};
    case "userAddPoints":
      return {...state, userPoints: action.addUserPoints};

    case "hasFinished":
      return {...state, finished: action.isFinished}

    case "countdown":
      return {...state, time: state.time - 1, finished: state.time === 0 ? true : state.finished}
    
    case "reset":
      return {...initialState}

    default:
      return state;  // Return the current state for any unhandled action type
  }
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <Header />
      <div className="main">
      {
        !state.finished ? 
      <Quiz state={state} dispatch={dispatch} />
      : <Results state={state} dispatch={dispatch} />
      }
      </div>
      
    </div>
  );
}
