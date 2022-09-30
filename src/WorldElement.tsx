import { useEffect, useState } from "react";

import "./WorldElement.css";

interface WorldElementProps {
  speed: number;
  tileUrl: string;
  tileWidth: number;
  tileHeight: number;
  alignment?: "top" | "bottom";
}

const WorldElement = ({
  speed,
  tileUrl,
  tileWidth,
  tileHeight,
  alignment = "bottom",
}: WorldElementProps) => {
  const numberOfTiles = Math.ceil(window.innerWidth / tileWidth) + 1;

  const [tilePositions, setTilePositions] = useState(
    Array(numberOfTiles)
      .fill(0)
      .map((_, index) => index * tileWidth)
  );

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setTilePositions((previousTilePositions) => {
        let newPositions = previousTilePositions.map(
          (position) => position - speed
        );
        if (newPositions[0] < -1 * tileWidth) {
          newPositions = [
            ...newPositions.slice(1),
            newPositions[newPositions.length - 1] + tileWidth,
          ];
        }
        return newPositions;
      });
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [speed, tileWidth]);

  return (
    <div className="world-element-wrapper">
      {tilePositions.map((position, index) => (
        <div
          key={index}
          className="tile"
          style={{
            left: position,
            width: tileWidth,
            height: tileHeight,
            backgroundImage: `url('${tileUrl}')`,
            ...(alignment === "top" && { top: 0 }),
            ...(alignment === "bottom" && { bottom: 0 }),
          }}
        />
      ))}
    </div>
  );
};

export default WorldElement;
