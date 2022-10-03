import Dino from "./Dino";
import useDinoFamily from "./useDinoFamily";
import { gemImageUrls } from "./constants";

import "./DinoFamily.css";

const gemsToTransfer = Array(30)
  .fill(undefined)
  .map(() => gemImageUrls[Math.floor(Math.random() * gemImageUrls.length)]);

interface DinoFamilyProps {
  dinoSpeed: number;
  stopDino: () => void;
}

const DinoFamily = ({ dinoSpeed, stopDino }: DinoFamilyProps) => {
  const { position, areGemsTransferring } = useDinoFamily({
    dinoSpeed,
    stopDino,
  });

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
          {gemsToTransfer.map((gem, gemIndex) => (
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
