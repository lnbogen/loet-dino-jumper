import { useState, useEffect } from "react";

import Dino from "./Dino";

import Gem1 from "./assets/gem-1.png";
import Gem2 from "./assets/gem-2.png";
import Gem3 from "./assets/gem-3.png";
import Gem4 from "./assets/gem-4.png";
import Gem5 from "./assets/gem-5.png";
import Gem6 from "./assets/gem-6.png";

import "./DinoFamily.css";

const gemImageUrls = [Gem1, Gem2, Gem3, Gem4, Gem5, Gem6];
const gems = Array(30)
  .fill(undefined)
  .map(() => gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)]);

interface DinoFamilyProps {
  dinoSpeed: number;
  stopDino: () => void;
}

const DinoFamily = ({ dinoSpeed, stopDino }: DinoFamilyProps) => {
  const [position, setPosition] = useState(window.innerWidth + 300);
  const [areGemsTransferring, setAreGemsTransferring] = useState(false);

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
      setTimeout(() => {
        setAreGemsTransferring(true);
      }, 500);
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
      {areGemsTransferring && (
        <div className="transferred-gems">
          {gems.map((gem, gemIndex) => (
            <img
              key={gemIndex}
              src={gem}
              alt=""
              style={{ animationDelay: `${gemIndex / 10}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DinoFamily;
