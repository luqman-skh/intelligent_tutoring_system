import React, { useState } from 'react';
import SideMenu from '../components/SideMenu'
import Chatbox from '../components/Chatbox'
import { useLocation } from 'react-router-dom';

function LessonContent() {

  const location = useLocation();
  const { lessonId: initialLessonId } = location.state || {};

  const [lessonId, setLessonId] = useState(initialLessonId || null);
  const [subtopicId, setSubtopicId] = useState(null);

  // Handler functions to update selected lesson and subtopic
  const handleLessonChange = (newLessonId) => {
    setLessonId(newLessonId);
    setSubtopicId(null); // Reset subtopic when lesson changes
  };

  const handleSubtopicChange = (newSubtopicId) => {
    setSubtopicId(newSubtopicId);
  };

  return (
    <div>
      <SideMenu 
        lessonId={lessonId} 
        onLessonChange={handleLessonChange} 
        onSubtopicChange={handleSubtopicChange} 
      />
      <div className="Main">
        <Chatbox lessonId={lessonId} subtopicId={subtopicId} />
      </div>
    </div>

  )
}


export default LessonContent
