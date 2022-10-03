import { useState, useEffect } from "react";

interface UseDinoFamilyParams {
  dinoSpeed: number;
  stopDino: () => void;
}

const dinoFamilyStopPosition = 300;

const useDinoFamily = ({ dinoSpeed, stopDino }: UseDinoFamilyParams) => {
  const [position, setPosition] = useState(
    window.innerWidth + dinoFamilyStopPosition
  );
  const [areGemsTransferring, setAreGemsTransferring] = useState(false);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((previousPosition) => {
        if (previousPosition > dinoFamilyStopPosition) {
          return previousPosition - dinoSpeed * 4;
        }
        return Math.max(previousPosition, dinoFamilyStopPosition);
      });
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoSpeed]);

  useEffect(() => {
    if (position === dinoFamilyStopPosition) {
      stopDino();
      setTimeout(() => {
        setAreGemsTransferring(true);
      }, 500);
    }
  }, [position, stopDino]);

  return { position, areGemsTransferring };
};

export default useDinoFamily;
