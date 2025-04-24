
// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCF_Ff1qqxxCeLoVnoMThfi4KjGQm0Lho",
    authDomain: "finexo-b3b6e.firebaseapp.com",
    projectId: "finexo-b3b6e",
    storageBucket: "finexo-b3b6e.firebasestorage.app",
    messagingSenderId: "872215184601",
    appId: "1:872215184601:web:ff68065750f3cbab57eac8"
  };
 

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle login
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      alert("Successfully logged in!");
      window.location.href = "index.html"; // Redirect to your app's homepage
    } else {
      console.error("No such user found in Firestore");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert(`Error: ${error.message}`);
  }
});
