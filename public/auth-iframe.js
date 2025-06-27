// auth-iframe.js - This code runs on your publicly hosted web page
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
// Make sure your firebaseConfig is available here
const firebaseConfig = {
  /* your Firebase project config */
  apiKey: "AIzaSyCCsNx7FjgfQev0EfTnKqCkgXWi9Ji-mNU",
  authDomain: "trade-app-b5155.web.app",
  projectId: "trade-app-b5155",
  storageBucket: "trade-app-b5155.firebasestorage.app",
  messagingSenderId: "51768261934",
  appId: "1:51768261934:web:e03f757da64d7562cf0ebf",
  measurementId: "G-C5BLTQS2K2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Example: Google

// Function to send response back to the Offscreen Document
function sendResponse(result) {
  globalThis.parent.self.postMessage(
    JSON.stringify(result),
    globalThis.location.ancestorOrigins[0]
  );
}

// Listen for messages from the Offscreen Document
globalThis.addEventListener("message", async ({ data }) => {
  if (data.action === "firebaseAuthPopup") {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      sendResponse({ success: true, user: userCredential.user.toJSON() });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
});
