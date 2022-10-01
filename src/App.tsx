import { useState, useMemo, useCallback } from "react";

import Sky from "./Sky";
import Hills from "./Hills";
import Gems from "./Gems";
import Dino from "./Dino";
import Ground from "./Ground";
import Splash from "./Splash";
import Countdown from "./Countdown";
import useDino from "./useDino";

import "./App.css";
import DinoFamily from "./DinoFamily";

const App = () => {
  const { dinoState, dinoPosition, isDinoFlipping, dinoRef, startDino } =
    useDino();

  const dinoSpeed = useMemo(() => {
    if (["running", "jumping"].includes(dinoState)) {
      return 1;
    }
    return 0;
  }, [dinoState]);

  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const onFinishGame = useCallback(() => {}, []);

  return (
    <>
      <div className="game-canvas">
        <div>
          <Sky dinoSpeed={dinoSpeed} />
          <Hills dinoSpeed={dinoSpeed} />
          <Gems
            dinoSpeed={dinoSpeed}
            dinoRef={dinoRef}
            onFinishGame={onFinishGame}
          />
          <Dino
            state={dinoState}
            position={dinoPosition}
            isFlipping={isDinoFlipping}
            dinoRef={dinoRef}
            isMain
          />
          <DinoFamily />
        </div>
        <div>
          <Ground dinoSpeed={dinoSpeed} />
        </div>
      </div>
      <Splash
        onStartGame={() => {
          setIsCountdownVisible(true);
        }}
      />
      {isCountdownVisible && <Countdown onHide={startDino} />}
    </>
  );
};

export default App;
