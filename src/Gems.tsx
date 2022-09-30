import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";

import Gem1 from "./assets/gem-1.png";
import Gem2 from "./assets/gem-2.png";
import Gem3 from "./assets/gem-3.png";
import Gem4 from "./assets/gem-4.png";
import Gem5 from "./assets/gem-5.png";
import Gem6 from "./assets/gem-6.png";

import "./Gems.css";

interface GemsProps {
  dinoSpeed: number;
  dinoRef: React.RefObject<HTMLDivElement>;
}

const gemImageUrls = [Gem1, Gem2, Gem3, Gem4, Gem5, Gem6];

const defaultRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const getNewGem = () => ({
  id: Date.now(),
  left: window.innerWidth + 50,
  bottom: Math.floor(Math.random() * 600),
  imageUrl: gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)],
  isTaken: false,
});

interface GemProps {
  bottom: number;
  left: number;
  imageUrl: string;
  dinoRef: React.RefObject<HTMLDivElement>;
  isTaken: boolean;
  id: number;
  onTakeGem: (id: number) => void;
}

const Gem = ({
  bottom,
  left,
  imageUrl,
  dinoRef,
  isTaken,
  id,
  onTakeGem,
}: GemProps) => {
  const gemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const collisionDetectionInterval = setInterval(() => {
      const gemBox = gemRef.current?.getBoundingClientRect() ?? defaultRect;
      const dinoBox = dinoRef.current?.getBoundingClientRect() ?? defaultRect;
      if (
        gemBox?.bottom > dinoBox?.top &&
        gemBox?.right > dinoBox?.left &&
        gemBox?.top < dinoBox?.bottom &&
        gemBox?.left < dinoBox?.right
      ) {
        onTakeGem(id);
      }
    }, 10);
    return () => {
      clearInterval(collisionDetectionInterval);
    };
  }, [dinoRef, id, onTakeGem]);

  return (
    <div
      className={classNames("gem-wrapper", { taken: isTaken })}
      style={{
        bottom,
        left,
      }}
      ref={gemRef}
    >
      <img src={imageUrl} alt="" />
    </div>
  );
};

const Gems = ({ dinoSpeed, dinoRef }: GemsProps) => {
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
        if (previousGems.length < 5) {
          return [...previousGems, getNewGem()];
        }
        return previousGems;
      });
    }, 2000);
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

  return (
    <div className="gems-wrapper">
      {gems.map((gem) => (
        <Gem
          key={gem.id}
          id={gem.id}
          bottom={gem.bottom}
          left={gem.left}
          imageUrl={gem.imageUrl}
          dinoRef={dinoRef}
          onTakeGem={onTakeGem}
          isTaken={gem.isTaken}
        />
      ))}
    </div>
  );
};

export default Gems;
