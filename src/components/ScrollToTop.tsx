import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollToTop component ensures that navigating to any new page, product card,
 * or related product link opens at the top (top: 0) globally across the entire website.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    // If navigating to an in-page anchor hash, scroll to that element
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    const resetAllScrollPositions = () => {
      // 1. Reset standard window and document viewport
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });

      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }

      // 2. Reset any nested scrollable containers in the DOM
      const scrollableSelectors = [
        "main",
        "#root",
        ".material-detail-page",
        ".products-category-section",
        ".md-content",
        ".category-content",
        ".container",
      ];

      scrollableSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el && el.scrollTop > 0) {
            el.scrollTop = 0;
          }
        });
      });
    };

    // Execute immediately before paint
    resetAllScrollPositions();

    // Re-verify on next animation frame after DOM updates without arbitrary timeouts
    const rafId = requestAnimationFrame(() => {
      resetAllScrollPositions();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash, navigationType]);

  return null;
};

export default ScrollToTop;
