import { useState, useEffect, useCallback, useRef } from "react";

import Gem1 from "./assets/gem-1.png";
import Gem2 from "./assets/gem-2.png";
import Gem3 from "./assets/gem-3.png";
import Gem4 from "./assets/gem-4.png";
import Gem5 from "./assets/gem-5.png";
import Gem6 from "./assets/gem-6.png";

interface UseGemsParams {
  dinoSpeed: number;
  isDinoOnTrain: boolean;
  onFinishGame: () => void;
  onStartTrain: () => void;
}

const gemImageUrls = [Gem1, Gem2, Gem3, Gem4, Gem5, Gem6];

const gameGemsNumber = 100;
const trainGemsNumbers = [15, 40, 65];

interface Gem {
  id: number;
  left: number;
  bottom: number;
  imageUrl: string;
  isTaken: boolean;
}

const getNewGem = (isDinoOnTrain: boolean): Gem => ({
  id: Date.now(),
  left: window.innerWidth + 50,
  bottom: Math.floor(Math.random() * 400) + (isDinoOnTrain ? 150 : 0),
  imageUrl: gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)],
  isTaken: false,
});

const useGems = ({
  dinoSpeed,
  isDinoOnTrain,
  onStartTrain,
  onFinishGame,
}: UseGemsParams) => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [gemCounter, setGemCounter] = useState(0);

  const increaseGemCounter = useCallback(() => {
    setGemCounter((previousGemCounter) => previousGemCounter + 1);
  }, []);

  const isDinoOnTrainRef = useRef(false);
  useEffect(() => {
    isDinoOnTrainRef.current = isDinoOnTrain;
  }, [isDinoOnTrain]);

  useEffect(() => {
    if (trainGemsNumbers.includes(gemCounter)) {
      onStartTrain();
    }
    if (gemCounter === gameGemsNumber) {
      onFinishGame();
    }
  }, [onFinishGame, gemCounter, onStartTrain]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gems.length === 0) {
        return;
      }
      setGems((previousGems) => {
        let newGems = previousGems.map((gem) => ({
          ...gem,
          left: gem.left - dinoSpeed * 4,
        }));
        if (newGems[0].left < -1 * 41) {
          newGems = newGems.slice(1);
        }
        return newGems;
      });
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoSpeed, gems.length]);

  useEffect(() => {
    const generateGemInterval = setInterval(() => {
      setGems((previousGems) => {
        if (
          dinoSpeed > 0 &&
          gemCounter < gameGemsNumber &&
          previousGems.length < 3
        ) {
          return [...previousGems, getNewGem(isDinoOnTrainRef.current)];
        }
        return previousGems;
      });
    }, 1500);
    return () => {
      clearInterval(generateGemInterval);
    };
  }, [dinoSpeed, gemCounter]);

  const onTakeGem = useCallback(
    (gemId: number) => {
      setGems((previousGems) =>
        previousGems.map((gem) => {
          if (gemId !== gem.id) {
            return gem;
          }
          return {
            ...gem,
            isTaken: true,
          };
        })
      );
      increaseGemCounter();
    },
    [increaseGemCounter]
  );

  return { gems, gemCounter, onTakeGem };
};

export default useGems;
