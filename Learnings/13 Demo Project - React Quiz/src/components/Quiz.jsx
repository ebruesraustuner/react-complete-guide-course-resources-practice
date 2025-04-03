import { useCallback, useRef, useState } from "react"
import questions from "../questions";
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex =  userAnswers.length;
    const quizIsComplete = activeQuestionIndex === questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')

        setUserAnswers((prev => {
            return [
                ...prev,
                selectedAnswer
            ]
        }));

        setTimeout(() => {
            if(selectedAnswer === questions[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            }else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex])  
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }

    return (
        <div id="quiz">
            
            <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}/>
            
        </div>
    )
}