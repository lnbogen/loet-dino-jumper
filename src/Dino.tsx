import "./Dino.css";

import DinoIdle from "./assets/dino-idle.png";
import DinoRunning from "./assets/dino-running.png";
import DinoJumping from "./assets/dino-jumping.png";
import classNames from "classnames";

import type { DinoState } from "./useDino";

interface DinoProps {
  state: DinoState;
  position: number;
  isFlipping?: boolean;
  isMain?: boolean;
  dinoRef?: React.RefObject<HTMLDivElement>;
}

const imageSources = {
  idle: DinoIdle,
  running: DinoRunning,
  jumping: DinoJumping,
};

const Dino = ({
  state,
  position,
  isFlipping = false,
  isMain = false,
  dinoRef,
}: DinoProps) => {
  return (
    <div
      className={classNames("dino", state, {
        flipping: isFlipping,
        main: isMain,
      })}
      style={{ bottom: `calc(${position}px - 17px)` }}
      ref={dinoRef}
    >
      <div>
        <img src={imageSources[state]} alt="" />
      </div>
    </div>
  );
};

export default Dino;
