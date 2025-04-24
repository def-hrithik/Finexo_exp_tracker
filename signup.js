

// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// ✅ Sign up form handler
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // ✅ Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username: username,
      email: user.email,
      createdAt: serverTimestamp()
    });

    alert("Sign up successful!");
    window.location.href = "login.html"; // redirect after signup

  } catch (error) {
    console.error("Signup error:", error);
    alert(`Error: ${error.message}`);
  }
});

