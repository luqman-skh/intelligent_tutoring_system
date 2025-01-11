import React from 'react'
import AskAnything from '../components/AskAnything'
import QuizGenerator from '../components/QuizGenerator'
import LessonOverview from '../components/LessonOverview'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Quiz");
    }
    return (
        <div>
            <QuizGenerator />
            <AskAnything />
            <LessonOverview/>
            <h3 onClick={handleClick}>Take Quiz</h3>
        </div>
    )
}

export default HomePage
