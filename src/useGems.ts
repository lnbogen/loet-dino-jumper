import { useState, useEffect, useCallback } from "react";

import Gem1 from "./assets/gem-1.png";
import Gem2 from "./assets/gem-2.png";
import Gem3 from "./assets/gem-3.png";
import Gem4 from "./assets/gem-4.png";
import Gem5 from "./assets/gem-5.png";
import Gem6 from "./assets/gem-6.png";

interface UseGemsParams {
  dinoSpeed: number;
}

const gemImageUrls = [Gem1, Gem2, Gem3, Gem4, Gem5, Gem6];

const getNewGem = () => ({
  id: Date.now(),
  left: window.innerWidth + 50,
  bottom: Math.floor(Math.random() * 400),
  imageUrl: gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)],
  isTaken: false,
});

const useGems = ({ dinoSpeed }: UseGemsParams) => {
  const [gems, setGems] = useState([getNewGem()]);

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
        if (previousGems.length < 10) {
          return [...previousGems, getNewGem()];
        }
        return previousGems;
      });
    }, 800);
    return () => {
      clearInterval(generateGemInterval);
    };
  }, [dinoSpeed, gems.length]);

  const onTakeGem = useCallback((gemId: number) => {
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
  }, []);

  return { gems, onTakeGem };
};

export default useGems;
