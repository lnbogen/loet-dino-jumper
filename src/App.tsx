import Dino from "./Dino";
import WorldElement from "./WorldElement";
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
      <div>
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 7 : 0}
          tileWidth={267}
          tileHeight={200}
          tileUrl={GroundTexture}
        />
      </div>
    </div>
  );
};

export default App;
