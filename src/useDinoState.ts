import { useState, useEffect, useCallback, useRef } from "react";
import useOnMount from "react-hook-on-mount";

import {
  gravity,
  minimumJumpAcceleration,
  maximumJumpAcceleration,
  flipJumpAccelerationThreshold,
} from "./constants";

export type DinoState = "idle" | "running" | "jumping";

const useDinoState = () => {
  const [dinoState, setDinoState] = useState<DinoState>("idle");
  const [dinoPosition, setDinoPosition] = useState(0);
  const [dinoAcceleration, setDinoAcceleration] = useState(0);
  const [isDinoFlipping, setIsDinoFlipping] = useState(false);
  const [jumpButtonDownTimestamp, setJumpButtonDownTimestamp] = useState<
    number | null
  >(null);

  const dinoRef = useRef<HTMLDivElement>(null);

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

  const dinoJumpButtonDownListener = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (
        ((event.type === "keydown" && (event as KeyboardEvent).key === " ") ||
          (event.type === "mousedown" && (event as MouseEvent).button === 0)) &&
        dinoState === "running"
      ) {
        setJumpButtonDownTimestamp((previousTimestamp) => {
          if (previousTimestamp === null) {
            return event.timeStamp;
          } else {
            return previousTimestamp;
          }
        });
      }
    },
    [dinoState]
  );

  const dinoJumpButtonUpListener = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (
        ((event.type === "keyup" && (event as KeyboardEvent).key === " ") ||
          (event.type === "mouseup" && (event as MouseEvent).button === 0)) &&
        dinoState === "running"
      ) {
        const jumpButtonPressDuration =
          event.timeStamp - (jumpButtonDownTimestamp ?? 0);
        const accelerationChange = Math.max(
          minimumJumpAcceleration,
          Math.min(jumpButtonPressDuration / 75, maximumJumpAcceleration)
        );
        if (accelerationChange > flipJumpAccelerationThreshold) {
          setIsDinoFlipping(true);
        }
        setDinoState("jumping");
        setDinoAcceleration(
          (previousAcceleration) => previousAcceleration - accelerationChange
        );
        setJumpButtonDownTimestamp(null);
      }
    },
    [dinoState, jumpButtonDownTimestamp]
  );

  // Jump
  useEffect(() => {
    document.addEventListener("keydown", dinoJumpButtonDownListener);
    document.addEventListener("keyup", dinoJumpButtonUpListener);
    document.addEventListener("mousedown", dinoJumpButtonDownListener);
    document.addEventListener("mouseup", dinoJumpButtonUpListener);

    return () => {
      document.removeEventListener("keydown", dinoJumpButtonDownListener);
      document.removeEventListener("keyup", dinoJumpButtonUpListener);
      document.removeEventListener("mousedown", dinoJumpButtonDownListener);
      document.removeEventListener("mouseup", dinoJumpButtonUpListener);
    };
  }, [dinoJumpButtonDownListener, dinoJumpButtonUpListener]);

  return { dinoState, dinoPosition, isDinoFlipping, dinoRef };
};

export default useDinoState;
