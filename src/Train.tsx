import { useState, useEffect } from "react";

import TrainImageUrl from "./assets/train.png";

import "./Train.css";

interface TrainProps {
  dinoSpeed: number;
  trainRef: React.RefObject<HTMLDivElement>;
  onStopTrain: () => void;
}

const trainSpeed = 2.25;

const Train = ({ dinoSpeed, trainRef, onStopTrain }: TrainProps) => {
  const [position, setPosition] = useState(-1345);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((previousPosition) => {
        if (previousPosition < window.innerWidth + 1345) {
          return previousPosition - dinoSpeed + trainSpeed;
        }
        return Math.min(previousPosition, window.innerWidth + 1345);
      });
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoSpeed]);

  useEffect(() => {
    if (position > window.innerWidth + 10) {
      onStopTrain();
    }
  });

  return (
    <div className="train" style={{ left: position }} ref={trainRef}>
      <img src={TrainImageUrl} alt="" />
    </div>
  );
};

export default Train;
