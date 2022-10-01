import { useState, useEffect } from "react";

import Dino from "./Dino";

import "./DinoFamily.css";

interface DinoFamilyProps {
  dinoSpeed: number;
  stopDino: () => void;
}

const DinoFamily = ({ dinoSpeed, stopDino }: DinoFamilyProps) => {
  const [position, setPosition] = useState(window.innerWidth + 300);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((previousPosition) => {
        if (previousPosition > 300) {
          return previousPosition - dinoSpeed * 4;
        }
        return Math.max(previousPosition, 300);
      });
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoSpeed]);

  useEffect(() => {
    if (position === 300) {
      stopDino();
    }
  }, [position, stopDino]);

  return (
    <div className="dino-family-wrapper" style={{ left: position }}>
      <div className="dino-parent-wrapper">
        <Dino state="idle" position={0} />
      </div>
      <div className="dino-child-wrapper">
        <Dino state="idle" position={0} />
      </div>
    </div>
  );
};

export default DinoFamily;
