import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Error404Page from "./Pages/Error404Page";
import StorePage from "./Pages/StorePage";

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
if (process.env.NODE_ENV !== "test") {
  const analytics = getAnalytics(app);
}
export const db = getDatabase(app);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage app={app} db={db} />} />

      <Route path="/store" element={<StorePage app={app} />} />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
