import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./NotSubscribedHeading.css";

function NotSubscribedHeading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return show ? (
    // Links to store, only visible when a user is logged in and isn't subscribed
    <Link to={"/store"} className="not-subscribed-heading-container">
      <motion.h4
        // fade messages in
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="not-subscribed-heading"
      >
        Visit The Store to Start
      </motion.h4>
    </Link>
  ) : null;
}

export default NotSubscribedHeading;
