import React, { useState } from "react";
import "./StoreButton.css";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { getFirestore } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

function StoreButton({ user, app }) {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const loadCheckout = async () => {
    setLoading(true);
    const docRef = await addDoc(
      collection(db, `customers/${user.uid}/checkout_sessions`),
      {
        mode: "payment",
        price: "price_1MRDEmG3QzTgLSVllFGkE2M8",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a Stripe Checkout URL, let's redirect.
        const stripe = await loadStripe(
          "pk_live_51MQJzsG3QzTgLSVlbbn61XR2oHPXoFBdUFzS2TpLtmAYpkad8VS9zNggzcxFP38emnL4YsHItBaLXHCrBugX5LZY005GSqsQAv"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
    setLoading(false);
  };

  return (
    <div className="store-button-container">
      <button onClick={() => loadCheckout()} className="store-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="store-button-svg"
        >
          <path
            d="M171.7 191.1h232.6L322.7 35.07c-6.1-11.76-1.5-26.249 10.2-32.364 11.8-6.115 26.3-1.539 32.4 10.224l93.1 178.17H544c17.7 0 32 15.2 32 32 0 18.6-14.3 32-32 32l-51.9 208.4c-8 28.5-32.7 48.5-62.1 48.5H145.1c-28.5 0-54.1-20-61.22-48.5L32 255.1c-17.67 0-32-13.4-32-32 0-16.8 14.33-32 32-32h85.6l93.1-178.17c6.1-11.763 20.6-16.339 32.4-10.224 11.7 6.115 16.3 20.604 10.2 32.364L171.7 191.1zm19.4 112c0-8-6.3-16-16-16-7.9 0-16 8-16 16v96c0 9.7 8.1 16 16 16 9.7 0 16-6.3 16-16v-96zm80 0v96c0 9.7 8.1 16 16 16 9.7 0 16.9-6.3 16.9-16v-96c0-8-7.2-16-16.9-16-7.9 0-16 8-16 16zm144.9 0c0-8-7.2-16-16-16s-16 8-16 16v96c0 9.7 7.2 16 16 16s16-6.3 16-16v-96z"
            fill="#fff"
          />
        </svg>
        Support Server Costs
        {loading && (
          <CircularProgress style={{ width: 15, height: 15, marginLeft: 5 }} />
        )}
      </button>
    </div>
  );
}

export default StoreButton;
