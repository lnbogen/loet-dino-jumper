import { useState, useMemo, useCallback, useRef } from "react";

import Sky from "./Sky";
import Hills from "./Hills";
import Gems from "./Gems";
import Dino from "./Dino";
import Ground from "./Ground";
import Train from "./Train";
import Splash from "./Splash";
import Countdown from "./Countdown";
import useDino from "./useDino";

import "./App.css";
import DinoFamily from "./DinoFamily";

const App = () => {
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const [isGameFinished, setIsGameFinished] = useState(false);

  const onFinishGame = useCallback(() => {
    setIsGameFinished(true);
  }, []);

  const trainRef = useRef<HTMLDivElement>(null);

  const {
    dinoState,
    dinoPosition,
    isDinoFlipping,
    dinoRef,
    startDino,
    stopDino,
    isDinoOnTrain,
  } = useDino({ isGameFinished, trainRef });

  const dinoSpeed = useMemo(() => {
    if (["running", "jumping"].includes(dinoState)) {
      if (isDinoOnTrain) {
        return 2;
      }
      return 1;
    }
    return 0;
  }, [dinoState, isDinoOnTrain]);

  const [isTrainGoing, setIsTrainGoing] = useState(false);

  const onStartTrain = useCallback(() => {
    setIsTrainGoing(true);
  }, []);

  const onStopTrain = useCallback(() => {
    setIsTrainGoing(false);
  }, []);

  return (
    <>
      <div className="game-canvas">
        <div>
          <Sky dinoSpeed={dinoSpeed} />
          <Hills dinoSpeed={dinoSpeed} />
          {isTrainGoing && (
            <Train
              dinoSpeed={dinoSpeed}
              trainRef={trainRef}
              onStopTrain={onStopTrain}
            />
          )}
          <Gems
            dinoSpeed={dinoSpeed}
            dinoRef={dinoRef}
            isDinoOnTrain={isDinoOnTrain}
            onStartTrain={onStartTrain}
            onFinishGame={onFinishGame}
          />
          <Dino
            state={dinoState}
            position={dinoPosition}
            isFlipping={isDinoFlipping}
            dinoRef={dinoRef}
            isMain
          />
          {isGameFinished && (
            <DinoFamily dinoSpeed={dinoSpeed} stopDino={stopDino} />
          )}
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
