import { useState, useEffect } from "react";

export default function QuestionTimer({timeOut, onTimeOut}) {
    const [remaingTime, setRemainingTime] = useState(timeOut)
    
    useEffect(() => {
        console.log('SETTING TIMEOUT');

       const timer =  setTimeout(onTimeOut, timeOut)

       return () => {
        clearTimeout(timer);
      };
    }, [timeOut, onTimeOut])


    useEffect(() => {
        console.log('SETTING INTERVAL');
       const interval =  setInterval(() => {
            setRemainingTime(prev => prev - 100)
        }, 100);
        return () => {
            clearInterval(interval)
        };
    }, [])

    return <progress id="question-time" max={timeOut} value={remaingTime} />;

    
}