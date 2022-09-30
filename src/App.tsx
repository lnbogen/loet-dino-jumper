import { useMemo } from "react";

import Sky from "./Sky";
import Hills from "./Hills";
import Gems from "./Gems";
import Dino from "./Dino";
import Ground from "./Ground";
import useDinoState from "./useDinoState";

import "./App.css";

const App = () => {
  const { dinoState, dinoPosition, isDinoFlipping, dinoRef } = useDinoState();

  const dinoSpeed = useMemo(() => {
    if (["running", "jumping"].includes(dinoState)) {
      return 1;
    }
    return 0;
  }, [dinoState]);

  return (
    <div className="game-canvas">
      <div>
        <Sky dinoSpeed={dinoSpeed} />
        <Hills dinoSpeed={dinoSpeed} />
        <Dino
          state={dinoState}
          position={dinoPosition}
          isFlipping={isDinoFlipping}
          dinoRef={dinoRef}
        />
        <Gems dinoSpeed={dinoSpeed} dinoRef={dinoRef} />
      </div>
      <div>
        <Ground dinoSpeed={dinoSpeed} />
      </div>
    </div>
  );
};

export default App;
