import { useState, useEffect } from "react";
import useOnMount from "react-hook-on-mount";

import Dino from "./Dino";

import GroundTexture from "./assets/ground.png";

import "./App.css";
import classNames from "classnames";

export type DinoState = "idle" | "running" | "jumping";

const gravity = 0.07;

const App = () => {
  const [dinoState, setDinoState] = useState<DinoState>("idle");
  const [dinoPosition, setDinoPosition] = useState(0);
  const [dinoAcceleration, setDinoAcceleration] = useState(0);
  const [isDinoFlipping, setIsDinoFlipping] = useState(false);
  const [jumpButtonDownTimestamp, setJumpButtonDownTimestamp] = useState<
    number | null
  >(null);

  // Start running after 1s
  useOnMount(() => {
    setTimeout(() => {
      setDinoState("running");
    }, 1000);
  });

  // Accelerate dino
  useEffect(() => {
    const accelerationInterval = setInterval(() => {
      if (dinoPosition > 0) {
        setDinoAcceleration(
          (previousAcceleration) => previousAcceleration + gravity
        );
      }
    }, 10);
    return () => {
      clearInterval(accelerationInterval);
    };
  }, [dinoAcceleration, dinoPosition]);

  // Move dino
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newDinoPosition = dinoPosition - dinoAcceleration;
      setDinoPosition(Math.max(newDinoPosition, 0));
      if (newDinoPosition < 0) {
        setDinoState("running");
        setDinoAcceleration(0);
        setIsDinoFlipping(false);
      }
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoAcceleration, dinoPosition]);

  // Jump
  useEffect(() => {
    const dinoJumpButtonDownListener = (event: KeyboardEvent) => {
      if (event.key === " " && dinoState === "running") {
        setJumpButtonDownTimestamp((previousTimestamp) => {
          if (previousTimestamp === null) {
            return event.timeStamp;
          } else {
            return previousTimestamp;
          }
        });
      }
    };

    document.addEventListener("keydown", dinoJumpButtonDownListener);

    const dinoJumpButtonUpListener = (event: KeyboardEvent) => {
      if (event.key === " " && dinoState === "running") {
        const jumpButtonPressDuration =
          event.timeStamp - (jumpButtonDownTimestamp ?? 0);
        console.log(jumpButtonPressDuration);
        const accelerationChange = Math.max(
          3,
          Math.min(jumpButtonPressDuration / 75, 8)
        );
        if (accelerationChange > 6) {
          setIsDinoFlipping(true);
        }
        setDinoState("jumping");
        setDinoAcceleration(
          (previousAcceleration) => previousAcceleration - accelerationChange
        );
        setJumpButtonDownTimestamp(null);
      }
    };

    document.addEventListener("keyup", dinoJumpButtonUpListener);

    return () => {
      document.removeEventListener("keydown", dinoJumpButtonDownListener);
      document.removeEventListener("keyup", dinoJumpButtonUpListener);
    };
  }, [dinoState, jumpButtonDownTimestamp]);

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
