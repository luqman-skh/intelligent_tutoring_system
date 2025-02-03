import { useState } from "react";
import { auth, googleProvider } from "../components/Firebase/FirebaseAuth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup Successful! Welcome " + userCredential.user.email);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! Welcome back " + userCredential.user.email);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In Successful! Welcome " + userCredential.user.email);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #5000ca, #007bff)" }}>
      <div className="card p-4" style={{ width: "350px", backgroundColor: "#1c1e21", color: "white", borderRadius: "10px" }}>
        <h3 className="text-center">{isSignup ? "SIGN UP" : "LOGIN"}</h3>
        <p className="text-center text-muted">{isSignup ? "Create a new account" : "Please enter your login and password!"}</p>
        {error && <p className="text-danger text-center">{error}</p>}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isSignup && <p className="text-center text-muted">Forgot password?</p>}
        <button className="btn btn-primary w-100" onClick={handleAuth} disabled={loading}>
          {loading ? "Processing..." : isSignup ? "SIGN UP" : "LOGIN"}
        </button>
        <div className="text-center mt-3">
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-twitter mx-2"></i>
          <i className="bi bi-google mx-2" onClick={handleGoogleSignIn} style={{ cursor: "pointer" }}></i>
        </div>
        <p className="text-center mt-3">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="fw-bold" style={{ cursor: "pointer" }} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
