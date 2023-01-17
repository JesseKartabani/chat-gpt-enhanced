import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";

const firebaseConfig = {
  apiKey: "AIzaSyBGRLU71c5pzN5WNY5IZtjEuFIZsGdcEjY",
  authDomain: "chat-gpt-enhanced.firebaseapp.com",
  projectId: "chat-gpt-enhanced",
  storageBucket: "chat-gpt-enhanced.appspot.com",
  messagingSenderId: "869064780631",
  appId: "1:869064780631:web:81faca4dc336a34935ac12",
  measurementId: "G-7TSL92D0X3",
  databaseURL: "https://chat-gpt-enhanced-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage app={app} db={db} />} />
    </Routes>
  );
}

export default App;
