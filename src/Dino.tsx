import "./Dino.css";

import DinoIdle from "./assets/dino-idle.png";
import DinoRunning from "./assets/dino-running.png";
import DinoJumping from "./assets/dino-jumping.png";
import classNames from "classnames";

import type { DinoState } from "./App";

interface DinoProps {
  state: DinoState;
  position: number;
}

const imageSources = {
  idle: DinoIdle,
  running: DinoRunning,
  jumping: DinoJumping,
};

const Dino = ({ state, position }: DinoProps) => {
  return (
    <div
      className={classNames("dino", state)}
      style={{ bottom: `calc(${position}px - 17px)` }}
    >
      <div>
        <img src={imageSources[state]} alt="" />
      </div>
    </div>
  );
};

export default Dino;
