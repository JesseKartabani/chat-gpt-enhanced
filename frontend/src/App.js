import React, { Suspense } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import { CircularProgress } from "@mui/material";
const Error404Page = React.lazy(() => import("./Pages/Error404Page"));
const StorePage = React.lazy(() => import("./Pages/StorePage"));

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
    <BrowserRouter>
      <Suspense
        fallback={
          <CircularProgress
            style={{
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "#b3befe",
            }}
          />
        }
      >
        <Routes>
          <Route path="/" element={<MainPage app={app} db={db} />} />

          <Route path="/store" element={<StorePage app={app} />} />

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
