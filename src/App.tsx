import Sky from "./Sky";
import Hills from "./Hills";
import Gems from "./Gems";
import Dino from "./Dino";
import Ground from "./Ground";
import Train from "./Train";
import Splash from "./Splash";
import Countdown from "./Countdown";
import useGame from "./useGame";
import useTrain from "./useTrain";
import useDino from "./useDino";

import "./App.css";
import DinoFamily from "./DinoFamily";

const App = () => {
  const {
    isCountdownVisible,
    setIsCountdownVisible,
    isGameFinished,
    onFinishGame,
  } = useGame();

  const { isTrainGoing, onStartTrain, onStopTrain, trainRef } = useTrain();

  const {
    dinoState,
    dinoPosition,
    dinoSpeed,
    isDinoFlipping,
    isDinoOnTrain,
    startDino,
    stopDino,
    dinoRef,
  } = useDino({ isGameFinished, trainRef });

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
