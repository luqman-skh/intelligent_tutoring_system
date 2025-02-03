import React from 'react'
import AskAnything from '../components/AskAnything'
import QuizGenerator from '../components/QuizGenerator'
import LessonOverview from '../components/LessonOverview'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
        </div>
    )
}

export default HomePage
