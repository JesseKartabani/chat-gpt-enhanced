import React, { useState, useEffect } from "react";
import "./StorePage.css";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";
import CheckSvg from "../Components/CheckSvg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function StorePage({ app }) {
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const loadSubscription = async () => {
    const ref = await getDocs(
      collection(db, `customers/${user.uid}/subscriptions`)
    );

    ref.forEach(async (doc) => {
      setSubscription({
        role: doc.data().role,
        current_period_end: doc.data().current_period_end,
        current_period_start: doc.data().current_period_start,
      });
    });
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadCheckout = async () => {
    setLoading(true);
    const docRef = await addDoc(
      collection(db, `customers/${user.uid}/checkout_sessions`),
      {
        price: "price_1MSCnSG3QzTgLSVlR4KN8wdS",
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
        setLoading(false);
      }
    });
  };
  return (
    <div className="store-container">
      <h1 className="store-heading">ChatGPT Enhanced</h1>

      {/* 
      <div>
        <button className="monthly-button">MONTHLY</button>
      </div>
      */}

      <motion.div
        // animate in from the left of the screen
        initial={{ opacity: 1, x: -800 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="sub-card"
      >
        <div className="store-recommended">RECOMMENDED</div>

        <div className="sub-role">
          <h2 className="store-subheading">Premium</h2>
          <p className="text-gray">Advanced Features</p>
        </div>

        <div className="pricing">
          <div className="price">
            $14.99<span className="currency-type">USD</span>
          </div>
          <div className="text-gray">Per Month</div>
        </div>

        <div className="sub-features">
          <div className="feature">
            <CheckSvg />
            Unlimited usage
          </div>
          <div className="feature">
            <CheckSvg />
            Access to all features
          </div>
          <div className="feature">
            <CheckSvg />
            Maximum message size
          </div>
          <div className="feature">
            <CheckSvg />
            Maximum response size
          </div>
        </div>

        {subscription?.role !== "premium" && (
          <>
            <button className="sub-button" onClick={() => loadCheckout()}>
              Choose Premium
              {loading && (
                <CircularProgress
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 10,
                    color: "white",
                  }}
                />
              )}
            </button>
          </>
        )}

        {subscription?.role === "premium" && (
          <a
            className="sub-button"
            href="https://billing.stripe.com/p/login/3cs2bKeB07PpgeI8ww"
          >
            Unsubscribe
          </a>
        )}
      </motion.div>

      <Link className="home-button" to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          style={{ marginRight: 10 }}
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
        Return Home
      </Link>
    </div>
  );
}

export default StorePage;
