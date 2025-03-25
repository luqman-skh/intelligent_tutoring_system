# Intelligent Tutoring System (ITS)

## Overview
This project is an **Intelligent Tutoring System (ITS)** that provides **personalized learning** experiences for Grade School Science students using a **Large Language Model (Llama-3.1-8B-Instruct)**. The system evaluates user responses, offers adaptive step-by-step explanations, and dynamically adjusts quiz difficulty using an **evolutionary algorithm** to enhance learning outcomes.

## Features
- **Adaptive Learning:** The system adjusts quiz difficulty based on student performance.
- **Interactive Learning:** Students can either ask questions freely or follow a structured syllabus.
- **Real-time Progress Tracking:** Uses Firestore to store user performance and learning history.
- **Fast & Scalable:** Built with React (frontend), FastAPI (backend), and FAISS for efficient content retrieval.

## System Architecture
### **Frontend (React)**
- Built using **React** for an interactive user experience.
- Two main functionalities:
  - **Ask Anything:** A freeform chat interface with the LLM.
  - **Learn:** A structured syllabus with quizzes and interactive content.
- Communicates with the backend via API requests.

### **Backend (FastAPI)**
- Built using **FastAPI** for high-performance request handling.
- Manages:
  - Processing user queries.
  - Fetching educational content.
  - Evaluating quiz scores and adapting difficulty levels.
  - Storing user progress in Firestore.

### **Database (Firestore)**
- Chosen for its **simplicity and real-time syncing**.
- Stores:
  - User profiles & progress.
  - Quiz scores.
  - Interaction history.

### **Adaptive Quiz Mechanism (Evolutionary Algorithm)**
- Dynamically adjusts question difficulty based on **past quiz scores**.
- Uses a fitness function:
  ```
  fitness_score = α × quiz_scores[-1] + β × improvement
  ```
- Ensures **personalized difficulty progression** to optimize learning outcomes.

## Usage
### **1. Ask Anything**
- Use the chat interface to ask any science-related question.
- The system retrieves relevant knowledge and generates an **accurate response**.

### **2. Structured Learning Mode**
- Follow the **syllabus-based** learning path.
- Read explanations and take quizzes.
- The system **adapts the difficulty** based on performance.

## Technologies Used
- **Frontend:** React, TailwindCSS
- **Backend:** FastAPI, Firestore
- **Machine Learning:** PyTorch, Hugging Face Transformers
- **LLM Model:** Llama-3.1-8B-Instruct

## Future Enhancements
- **Multimodal Learning:** Integrate **images, videos, and speech-based interactions**.
- **Gamification:** Introduce badges, leaderboards, and rewards.
- **Mobile App:** Build a mobile-friendly version for a wider reach.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


---
🚀 **Empowering the future of education with AI!**

