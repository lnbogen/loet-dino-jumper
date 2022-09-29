import "./Dino.css";

import DinoIdle from "./assets/dino-idle.png";
import DinoRunning from "./assets/dino-running.png";
import DinoJumping from "./assets/dino-jumping.png";
import classNames from "classnames";

type DinoState = "idle" | "running" | "jumping";

interface DinoProps {
  state: DinoState;
}

const imageSources = {
  idle: DinoIdle,
  running: DinoRunning,
  jumping: DinoJumping,
};

interface DinoProps {
  state: DinoState;
}

const Dino = ({ state }: DinoProps) => {
  return (
    <div>
      <div className={classNames("dino", state)}>
        <div>
          <img src={imageSources[state]} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dino;
