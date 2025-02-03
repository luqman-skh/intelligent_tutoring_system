// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
// import { UserContext } from './Firebase/UserContext';
// import Button from 'react-bootstrap/Button';
// import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { signInWithRedirect } from 'firebase/auth';

// const Navbar = () => {
//     const [userID, setUserID] = useState(null);
//     const [userRef, setUserRef] = useState(null);
//     const user = useContext(UserContext); // Use the context for user state
//     const auth = getAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Subscribe to both auth state changes
//         const unsubscribeUserInfo = onAuthStateChanged(auth, (user) => {
//           if (user) {
//             // User is signed in
//             setUserID(user.uid);
//             console.log("User ID:", user.uid);
//           } else {
//             // User is signed out
//             setUserID(null);
//           }
//         });

//         const unsubscribeCurrentUser = onAuthStateChanged(auth, (currentUser) => {
//           setUserRef(currentUser);
//         });

//         // Cleanup both subscriptions on unmount
//         return () => {
//           unsubscribeUserInfo();
//           unsubscribeCurrentUser();
//         };
//       }, []);

//       const handleLogin = async () => {
//         const auth = getAuth();
//         const provider = new GoogleAuthProvider();

//         try {
//             await signInWithRedirect(auth, provider);
//         } catch (error) {
//             console.error("Login failed:", error.message);
//         }
//     };

//     const handleSignOut = async () => {
//         try {
//             await signOut(auth);
//             navigate('/'); // Redirect to home on logout
//         } catch (error) {
//             console.error("Sign-out failed:", error.message);
//         }
//     };

//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="/">Intelligent Tutoring System</Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                             <li className="nav-item mx-2">
//                                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                             </li>
//                             <li className="nav-item mx-2">
//                                 <Link className="nav-link" to="/">Ask Anything</Link>
//                             </li>
//                             <li className="nav-item mx-2">
//                                 <Link className="nav-link" to="/learn">Learn</Link>
//                             </li>
//                         </ul>
//                         {
//                             user ? (
//                             <Button variant="danger mx-2" onClick={handleSignOut}>Sign Out</Button>
//                         ) : (
//                             <Button variant="primary mx-2" onClick={handleLogin}>Login with Google</Button>
//                         )}
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { UserContext } from './Firebase/UserContext';
import Button from 'react-bootstrap/Button';

const Navbar = () => {
    const user = useContext(UserContext); // Get the user from context
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to home on logout
        } catch (error) {
            console.error("Sign-out failed:", error.message);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-olive-green" data-bs-theme="dark">

                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Intelligent Tutoring System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/ask">Ask Anything</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/learn">Learn</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                        </ul>
                        {user ? (
                            <Button variant="danger mx-2" onClick={handleSignOut}>Sign Out</Button>
                        ) : (
                            <Button variant="primary mx-2" onClick={handleLogin}>Login with Google</Button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
