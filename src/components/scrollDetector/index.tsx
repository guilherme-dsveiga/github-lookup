import { useEffect } from "react";

type ScrollDetectorProps = {
  onBottomReached: () => void;
};

function ScrollDetector({ onBottomReached }: ScrollDetectorProps) {
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 800
      ) {
        onBottomReached();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onBottomReached]);

  return null;
}

export default ScrollDetector;
