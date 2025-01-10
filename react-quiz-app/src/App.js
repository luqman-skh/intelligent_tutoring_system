import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [quiz, setQuiz] = useState("");
  const [askResponse, setAskResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [topicResponse, setTopicResponse] = useState("");
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(false);
  const [errorQuiz, setErrorQuiz] = useState("");
  const [errorAsk, setErrorAsk] = useState("");
  const [errorTopic, setErrorTopic] = useState("");

  // API endpoints
  const QUIZ_API_URL = "https://98cd-34-16-142-13.ngrok-free.app/generate_quiz";
  const ASK_API_URL = "https://b76b-34-105-126-138.ngrok-free.app/ask_anything";

  // Topics for learning
  const topics = [
    {
      id: 1, name: "Unit 1",
      subtopics: [
        { id: 101, name: "The Environment", },
        { id: 102, name: "Biology ", },
        { id: 103, name: "Cells", }
      ]
    },
    {
      id: 2, name: "Unit 2",
      subtopics: [
        { id: 201, name: "Green Plants", },
        { id: 202, name: "Soil and Nutrients", },
        { id: 203, name: "Groups of Living Things Classification", }
      ]
    },
    {
      id: 3, name: "Unit 3",
      subtopics: [
        { id: 301, name: "The Digestive System ", },
        { id: 302, name: "The Circulatory System", },
        { id: 303, name: "The Respiratory System ", }
      ]
    }
  ];

  // Function to fetch the quiz
  const fetchQuiz = async () => {
    setLoadingQuiz(true);
    setErrorQuiz("");
    setQuiz("");
    try {
      const response = await axios.post(
        QUIZ_API_URL,
        { topic: "states of matter" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.quiz) {
        setQuiz(response.data.quiz);
      } else {
        setErrorQuiz("Unexpected response structure from the server.");
      }
    } catch (err) {
      console.error("Error fetching quiz:", err.response || err.message);
      setErrorQuiz("Failed to fetch quiz. Please try again.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Function to handle "Ask Anything"
  const askAnything = async () => {
    if (!question.trim()) {
      setErrorAsk("Please enter a question.");
      return;
    }

    setLoadingAsk(true);
    setErrorAsk("");
    setAskResponse("");
    try {
      const response = await axios.post(
        ASK_API_URL,
        { topic: question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.response) {
        setAskResponse(response.data.response);
      } else {
        setErrorAsk("Unexpected response structure from the server.");
      }
    } catch (err) {
      console.error("Error asking question:", err.response || err.message);
      setErrorAsk("Failed to fetch answer. Please try again.");
    } finally {
      setLoadingAsk(false);
    }
  };

  // Function to handle topic click
  const fetchTopicInfo = async (chapter) => {
    setLoadingTopic(true);
    setErrorTopic("");
    setTopicResponse("");
    try {
      const response = await axios.post(
        ASK_API_URL,
        { topic: `Explain in detail what is ${chapter}` },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.response) {
        setTopicResponse(response.data.response);
      } else {
        setErrorTopic("Unexpected response structure from the server.");
      }
    } catch (err) {
      console.error("Error fetching topic info:", err.response || err.message);
      setErrorTopic("Failed to fetch topic information. Please try again.");
    } finally {
      setLoadingTopic(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Quiz and Q&A Generator</h1>

        {/* Quiz Section */}
        <section>
          <h2>Generate a Quiz</h2>
          <p>Click the button below to generate a quiz on "States of Matter".</p>
          <button onClick={fetchQuiz} disabled={loadingQuiz}>
            {loadingQuiz ? "Loading..." : "Generate Quiz"}
          </button>

          {quiz && (
            <div className="quiz-container">
              <h3>Generated Quiz:</h3>
              <p>{quiz}</p>
            </div>
          )}

          {errorQuiz && <p className="error">{errorQuiz}</p>}
        </section>

        {/* Ask Anything Section */}
        <section>
          <h2>Ask Anything</h2>
          <p>Type your question below and click "Ask" to get an answer.</p>
          <input
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loadingAsk}
          />
          <button onClick={askAnything} disabled={loadingAsk}>
            {loadingAsk ? "Loading..." : "Ask"}
          </button>

          {askResponse && (
            <div className="ask-response-container">
              <h3>Answer:</h3>
              <p>{askResponse}</p>
            </div>
          )}

          {errorAsk && <p className="error">{errorAsk}</p>}
        </section>

        {/* Topic Learning Section */}
        <section>
          <h2>What would you want to learn about today?</h2>
          <div className="topics-container">
            <div className="row g-4">

              {/* {topics.map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => fetchTopicInfo(chapter)}
                  disabled={loadingTopic}
                >
                  {loadingTopic ? `Loading ${chapter}...` : chapter}
                </button>
              ))} */}

              {topics.map((topic) => {
                return (
                  <div
                    key={topic.id}
                    className="col-lg-4 col-md-6 col-sm-12"
                  >
                    {topic.subtopics.map((subtopic) => {
                      return (
                        <button
                          key={subtopic.id}
                          onClick={() => fetchTopicInfo(subtopic.name)}
                          disabled={loadingTopic}
                        >
                          {loadingTopic ? `Loading ${subtopic.name}...` : subtopic.name}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {topicResponse && (
            <div className="topic-response-container">
              <h3>Topic Information:</h3>
              <p>{topicResponse}</p>
            </div>
          )}

          {errorTopic && <p className="error">{errorTopic}</p>}
        </section>
      </header>
    </div>
  );
}

export default App;
