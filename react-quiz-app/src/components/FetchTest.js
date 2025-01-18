import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT2KHPIlH2AUZvtiiU1AZYMpAXXViFuak",
  authDomain: "its-hcat.firebaseapp.com",
  projectId: "its-hcat",
  storageBucket: "its-hcat.firebasestorage.app",
  messagingSenderId: "172113702731",
  appId: "1:172113702731:web:79631e07c871e07165c2ce",
  measurementId: "G-LNC6MNX9ZR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const FetchTest = () => {
    const [topic, setTopic] = useState(null);
    const [subtopic, setsubTopic] = useState(null);

    // Hardcoded values for testing
    const topicId = '1';      // Replace '1' with the actual topic ID if different


    useEffect(() => {
        const fetchsubTopic = async () => {
            const db = getFirestore();
            const docRef = doc(db, 'topics', topicId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const topicData = docSnap.data();
                const subtopic_content = topicData.subtopic_content;
                console.log(subtopic_content)

                // const subtopicData = subtopics.find((sub) => sub[0] === subtopicId);
                // console.log(subtopics)
                {subtopic_content.map((subtopic) => {
                    console.log(subtopic); // Log the current subtopic for debugging
                    if (subtopic.title === 'Change') { // Check the specific subtopicID
                        setsubTopic({
                            id: subtopic.subtopicID,
                            title: subtopic.title, // Ensure title exists in your data structure
                            content: subtopic.content,
                        });
                    }
                })}
                
                // setsubTopic({
                //     id: subtopics[0],
                //     title: subtopics[1],
                //     content: subtopics[2],
                // });
            }
                else {
                    console.error('SubTopic does not exist')
                }
        };

        fetchsubTopic();
    }, []);

    if (!subtopic) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Main">
            <h2>{subtopic.title}</h2>
            <p>{subtopic.content}</p>
        </div>
    );
}

export default FetchTest




// src/components/SubtopicContent.js

// import { db } from '../firebase';

// const SubtopicContent = ({ topicId, subtopicId }) => {
//   const [subtopic, setSubtopic] = useState(null);

//   useEffect(() => {
//     const fetchSubtopic = async () => {
//       try {
//         // Reference to the specific topic document
//         const topicDocRef = doc(db, 'topics', topicId);
//         const topicDoc = await getDoc(topicDocRef);

//         if (topicDoc.exists()) {
//           const topicData = topicDoc.data();
//           const subtopicData = topicData.subtopics.find(sub => sub.subtopicId === subtopicId);

//           if (subtopicData) {
//             setSubtopic(subtopicData);
//           } else {
//             console.error('Subtopic not found');
//           }
//         } else {
//           console.error('Topic document not found');
//         }
//       } catch (error) {
//         console.error('Error fetching subtopic:', error);
//       }
//     };

//     fetchSubtopic();
//   }, [topicId, subtopicId]);

//   return (
//     <div>
//       {subtopic ? (
//         <>
//           <h1>{subtopic.title}</h1>
//           <p>{subtopic.content}</p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };
