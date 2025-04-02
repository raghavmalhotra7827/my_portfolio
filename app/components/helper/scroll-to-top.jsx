"use client";

import { useEffect, useState, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa6";

const DEFAULT_BTN_CLS =
  "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out opacity-0 invisible";
const VISIBLE_BTN_CLS =
  "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out opacity-100 visible";
const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Throttle function to limit scroll event processing
  const throttle = useCallback((callback, delay = 100) => {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        if (!isVisible) {
          setIsVisible(true);
        }
      } else {
        if (isVisible) {
          setIsVisible(false);
        }
      }
    }, 100);

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, [isVisible, throttle]);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button className={isVisible ? VISIBLE_BTN_CLS : DEFAULT_BTN_CLS} onClick={onClickBtn} aria-label="Scroll to top">
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
