import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css"; // Include the CSS file
import { useNavigate } from 'react-router-dom'


const Sidebar = ({ lessonId, onLessonChange, onSubtopicChange }) => {

  const lessons = [
    {
      topicId: 1,
      title: "Lesson 1: The Environment",
      subtopics: [
        {
          subtopicId: 101,
          title: "Observation"
        },
        {
          subtopicId: 102,
          title: "Change"
        }
      ]
    },
    {
      topicId: 2,
      title: "Lesson 2: Biology",
      subtopics: [
        {
          subtopicId: 201,
          title: "What Is Biology?"
        },
        {
          subtopicId: 202,
          title: "Organisms"
        },
        {
          subtopicId: 203,
          title: "Life and Living Things"
        },
        {
          subtopicId: 204,
          title: "Movement"
        },
        {
          subtopicId: 205,
          title: "Response to the Environment"
        },
        {
          subtopicId: 206,
          title: "Growth and Development"
        }
      ]
    },
    {
      topicId: 3,
      title: "Lesson 3: Cells",
      subtopics: [
        {
          subtopicId: 301,
          title: "Cell Structure and Function"
        },
        {
          subtopicId: 302,
          title: "Levels of Organization"
        }
      ]
    },
    {
      topicId: 4,
      title: "Lesson 4: Green Plants",
      subtopics: [
        {
          subtopicId: 401,
          title: "The Seed"
        },
        {
          subtopicId: 402,
          title: "The Seed’s Needs"
        },
        {
          subtopicId: 403,
          title: "Seed Dispersal"
        },
        {
          subtopicId: 404,
          title: "Sprouting"
        },
        {
          subtopicId: 405,
          title: "The Seedling"
        },
        {
          subtopicId: 406,
          title: "Roots"
        },
        {
          subtopicId: 407,
          title: "Buds"
        },
        {
          subtopicId: 408,
          title: "Photosynthesis"
        },
        {
          subtopicId: 409,
          title: "Transpiration"
        },
        {
          subtopicId: 410,
          title: "Flowers and Plant Reproduction"
        }
      ]
    },
    {
      topicId: 5,
      title: "Lesson 5: Soil and Nutrients",
      subtopics: [
        {
          subtopicId: 501,
          title: "Fertilizers, Bacteria, and Compost"
        }
      ]
    },
    {
      topicId: 6,
      title: "Lesson 6: Cell Division",
      subtopics: [
        {
          subtopicId: 601,
          title: "Asexual Reproduction"
        },
        {
          subtopicId: 602,
          title: "Sexual Reproduction"
        }
      ]
    },
    {
      topicId: 7,
      title: "Lesson 7: Groups of Living Things",
      subtopics: [
        {
          subtopicId: 701,
          title: "Classification"
        }
      ]
    },
    {
      topicId: 8,
      title: "Lesson 8: Other Types of Living Organisms",
      subtopics: [
        {
          subtopicId: 801,
          title: "Protists"
        },
        {
          subtopicId: 802,
          title: "Bacteria and Archaea"
        },
        {
          subtopicId: 803,
          title: "Fungi"
        },
        {
          subtopicId: 804,
          title: "Viruses"
        }
      ]
    },
    {
      topicId: 9,
      title: "The Digestive System",
      subtopics: [
        {
          subtopicId: 901,
          title: "The Parts of the Digestive System"
        },
        {
          subtopicId: 902,
          title: "Common Ailments of the Digestive System"
        },
        {
          subtopicId: 903,
          title: "Care of the Digestive System"
        }
      ]
    },
    {
      topicId: 10,
      title: "The Circulatory System",
      subtopics: [
        {
          subtopicId: 1001,
          title: "The Parts of the Circulatory System"
        },
        {
          subtopicId: 1002,
          title: "How Circulation Takes Place"
        },
        {
          subtopicId: 1003,
          title: "Some Common Circulatory Diseases"
        },
        {
          subtopicId: 1004,
          title: "Care of the Circulatory System"
        }
      ]
    },
    {
      topicId: 11,
      title: "The Respiratory System",
      subtopics: [
        {
          subtopicId: 1101,
          title: "The Importance of the Respiratory System"
        },
        {
          subtopicId: 1102,
          title: "The Parts of the Respiratory System"
        },
        {
          subtopicId: 1103,
          title: "The Breathing Process"
        },
        {
          subtopicId: 1104,
          title: "Common Ailments of the Respiratory System"
        },
        {
          subtopicId: 1105,
          title: "Care of the Respiratory System"
        }
      ]
    },
    {
      topicId: 12,
      title: "The Excretory System",
      subtopics: [
        {
          subtopicId: 1201,
          title: "The Parts of the Excretory System"
        },
        {
          subtopicId: 1202,
          title: "Some Common Ailments of Excretory System"
        },
        {
          subtopicId: 1203,
          title: "Care of the Excretory System"
        }
      ]
    }
  ];


// Find the lesson corresponding to the provided lessonId
const selectedLesson = lessons.find((lesson) => lesson.topicId === lessonId);

const navigate = useNavigate();
const handleQuiz = () => {
  navigate("/Quiz", { state: { lessonId } });
}

return (
  <div className="sidebar">
    {selectedLesson ? (
      <>
        <h2>{selectedLesson.title}</h2>
        <nav>
          <ul>
            {selectedLesson.subtopics.map((subtopic) => (
              <li key={subtopic.subtopicId}>
                  <Link 
                    className="subtopic-btn" 
                    onClick={() => onSubtopicChange(subtopic.subtopicId)}
                  >
                    {subtopic.title}
                  </Link>
                </li>
            ))}
          </ul>
          <button onClick= {handleQuiz} className = 'take-quiz'>Take Quiz</button>
        </nav>
      </>
    ) : (
      <p>No lesson found for the provided ID.</p>
    )}
  </div>
);
};

export default Sidebar;
