import classNames from "classnames";

import Dino from "./Dino";
import useDinoState from "./useDinoState";

import GroundTexture from "./assets/ground.png";

import "./App.css";

const App = () => {
  const { dinoState, dinoPosition, isDinoFlipping } = useDinoState();

  return (
    <div className="game-canvas">
      <div className="sky">
        <Dino
          state={dinoState}
          position={dinoPosition}
          isFlipping={isDinoFlipping}
        />
      </div>
      <div
        className={classNames("ground", {
          moving: ["running", "jumping"].includes(dinoState),
        })}
        style={{ backgroundImage: `url('${GroundTexture}')` }}
      ></div>
    </div>
  );
};

export default App;
