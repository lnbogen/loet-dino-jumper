import { useState, useEffect } from "react";

import Gem1 from "./assets/gem-1.png";
import Gem2 from "./assets/gem-2.png";
import Gem3 from "./assets/gem-3.png";
import Gem4 from "./assets/gem-4.png";
import Gem5 from "./assets/gem-5.png";
import Gem6 from "./assets/gem-6.png";

import "./Gems.css";

interface GemsSpeed {
  dinoSpeed: number;
}

const gemImageUrls = [Gem1, Gem2, Gem3, Gem4, Gem5, Gem6];

const getNewGem = () => ({
  id: Date.now(),
  left: window.innerWidth + 50,
  bottom: Math.floor(Math.random() * 600),
  imageUrl: gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)],
});

const Gems = ({ dinoSpeed }: GemsSpeed) => {
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
      setGems((previousGems) => [...previousGems, getNewGem()]);
    }, 2000);
    return () => {
      clearInterval(generateGemInterval);
    };
  }, [dinoSpeed, gems.length]);

  return (
    <div className="gems-wrapper">
      {gems.map((gem) => (
        <div
          className="gem-wrapper"
          key={gem.id}
          style={{
            bottom: gem.bottom,
            left: gem.left,
          }}
        >
          <img src={gem.imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Gems;
