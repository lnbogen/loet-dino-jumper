import { useState, useEffect } from "react";
import useOnMount from "react-hook-on-mount";

import Dino from "./Dino";

import GroundTexture from "./assets/ground.png";

import "./App.css";
import classNames from "classnames";

export type DinoState = "idle" | "running" | "jumping";

const gravity = 0.05;

const App = () => {
  const [dinoState, setDinoState] = useState<DinoState>("idle");
  const [dinoPosition, setDinoPosition] = useState(0);
  const [dinoAcceleration, setDinoAcceleration] = useState(0);

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
      }
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoAcceleration, dinoPosition]);

  // Jump
  useEffect(() => {
    const dinoJumpListener = (event: KeyboardEvent) => {
      if (event.key === " " && dinoState === "running") {
        setDinoState("jumping");
        setDinoAcceleration((previousAcceleration) => previousAcceleration - 6);
      }
    };

    document.addEventListener("keydown", dinoJumpListener);

    return () => {
      document.removeEventListener("keydown", dinoJumpListener);
    };
  }, [dinoState]);

  return (
    <div className="game-canvas">
      <div className="sky">
        <Dino state={dinoState} position={dinoPosition} />
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
