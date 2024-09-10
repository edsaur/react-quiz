import { useEffect } from "react";

export function useQuiz(dispatch){
    useEffect(function(){
        async function getQuestions() {
           try {
            //    const res = await fetch('/questions.json');
               const res = await fetch('http://localhost:9000/questions');
               const data = await res.json();
            //    console.log(data);
               //    const question = data.questions.map(q => q.question);
               const question = data.map(q => q.question);
            
            //    const answers = data.questions.map(q => q.options);
               const answers = data.map(q => q.options);
            
            //    const correctAnswer = data.questions.map(q => q.correctOption);
               const correctAnswer = data.map(q => q.correctOption);
            
            //    const points = data.questions.map(q=>q.points);
               const points = data.map(q=>q.points);

               const totalPoints = points.reduce((acc, curr) => acc + curr);

               dispatch({type: 'questions', questions: question});
               dispatch({type: 'answers', answers: answers});
               dispatch({type: 'correctAnswer', correctAnswer: correctAnswer});
               dispatch({type: 'points', points: points, totalPoints: totalPoints});

           } catch (error) {
               dispatch({type: 'hasError'});
           }
        }
        getQuestions();
       }, [dispatch]);
    
    //    console.log(isLoading);  
}