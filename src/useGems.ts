import { useState, useEffect, useCallback, useRef } from "react";

import {
  gemImageUrls,
  numberOfGemsToCollect,
  trainShowsUpAtNumberOfGemsCollected,
} from "./constants";

interface UseGemsParams {
  dinoSpeed: number;
  isDinoOnTrain: boolean;
  onFinishGame: () => void;
  onStartTrain: () => void;
}

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
  const isDinoOnTrainRef = useRef(false);

  const [gems, setGems] = useState<Gem[]>([]);
  const [gemCounter, setGemCounter] = useState(0);

  const increaseGemCounter = useCallback(() => {
    setGemCounter((previousGemCounter) => previousGemCounter + 1);
  }, []);

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

  useEffect(() => {
    isDinoOnTrainRef.current = isDinoOnTrain;
  }, [isDinoOnTrain]);

  useEffect(() => {
    if (trainShowsUpAtNumberOfGemsCollected.includes(gemCounter)) {
      onStartTrain();
    }
    if (gemCounter === numberOfGemsToCollect) {
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
          gemCounter < numberOfGemsToCollect &&
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

  return { gems, gemCounter, onTakeGem };
};

export default useGems;
