import Dino from "./Dino";
import WorldElement from "./WorldElement";
import useDinoState from "./useDinoState";

import GroundTexture from "./assets/ground.png";
import Hills1 from "./assets/hills-1.png";
import Hills2 from "./assets/hills-2.png";
import Hills3 from "./assets/hills-3.png";
import Volcano from "./assets/volcano.png";
import Clouds from "./assets/clouds.png";

import "./App.css";

const App = () => {
  const { dinoState, dinoPosition, isDinoFlipping } = useDinoState();

  return (
    <div className="game-canvas">
      <div className="sky">
        <div className="sun" />
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 0.1 : 0.05}
          tileWidth={960}
          tileHeight={343}
          tileUrl={Clouds}
          alignment="top"
        />
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 0.5 : 0}
          tileWidth={1000}
          tileHeight={697}
          tileUrl={Volcano}
        />
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 1 : 0}
          tileWidth={800}
          tileHeight={340}
          tileUrl={Hills3}
        />
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 1.25 : 0}
          tileWidth={500}
          tileHeight={196}
          tileUrl={Hills2}
        />
        <WorldElement
          speed={["running", "jumping"].includes(dinoState) ? 2 : 0}
          tileWidth={400}
          tileHeight={91}
          tileUrl={Hills1}
        />
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
