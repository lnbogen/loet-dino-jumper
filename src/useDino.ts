import { useState, useEffect, useCallback, useRef, useMemo } from "react";

import {
  gravity,
  minimumJumpAcceleration,
  maximumJumpAcceleration,
} from "./constants";

export type DinoState = "idle" | "running" | "jumping";

interface UseDinoParams {
  isGameFinished: boolean;
  trainRef: React.RefObject<HTMLDivElement>;
}

const defaultClientRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const useDino = ({ isGameFinished, trainRef }: UseDinoParams) => {
  const [dinoState, setDinoState] = useState<DinoState>("idle");
  const [dinoPosition, setDinoPosition] = useState(0);
  const [dinoAcceleration, setDinoAcceleration] = useState(0);
  const [isDinoFlipping, setIsDinoFlipping] = useState(false);

  const accelerationCounter = useRef(0);

  const dinoRef = useRef<HTMLDivElement>(null);

  const startDino = useCallback(() => {
    setDinoState("running");
  }, []);

  const stopDino = useCallback(() => {
    setDinoState("idle");
  }, []);

  const isDinoOverTrainRef = useRef(false);
  const floorRef = useRef(0);

  const [isDinoOnTrain, setIsDinoOnTrain] = useState(false);

  useEffect(() => {
    const trainInterval = setInterval(() => {
      const {
        left: trainLeft,
        right: trainRight,
        top: trainTop,
      } = trainRef.current?.getBoundingClientRect() ?? defaultClientRect;
      const {
        left: dinoLeft,
        right: dinoRight,
        bottom: dinoBottom,
      } = dinoRef.current?.getBoundingClientRect() ?? defaultClientRect;
      const isDinoOverTrain =
        dinoLeft > trainLeft &&
        dinoRight < trainRight - 100 &&
        dinoBottom <= trainTop + 20;
      isDinoOverTrainRef.current = isDinoOverTrain;
      if (isDinoOverTrain) {
        floorRef.current = 150;
      } else {
        floorRef.current = 0;
      }
    }, 10);
    return () => {
      clearInterval(trainInterval);
    };
  }, [trainRef]);

  // Accelerate dino
  useEffect(() => {
    const accelerationInterval = setInterval(() => {
      if (dinoPosition > floorRef.current) {
        setDinoAcceleration(
          (previousAcceleration) => previousAcceleration + gravity
        );
      }
    }, 10);
    return () => {
      clearInterval(accelerationInterval);
    };
  }, [dinoAcceleration, dinoPosition, trainRef]);

  // Move dino
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newDinoPosition = dinoPosition - dinoAcceleration;
      setDinoPosition(Math.max(newDinoPosition, floorRef.current));
      if (newDinoPosition < floorRef.current) {
        setIsDinoOnTrain(floorRef.current > 0);
        setDinoState("running");
        setDinoAcceleration(0);
        setIsDinoFlipping(false);
      }
    }, 10);
    return () => {
      clearInterval(moveInterval);
    };
  }, [dinoAcceleration, dinoPosition, trainRef]);

  const dinoAccelerationTimeout = useCallback(() => {
    if (accelerationCounter.current > 0) {
      accelerationCounter.current--;
      setDinoAcceleration((previousAcceleration) => previousAcceleration - 1);
      setTimeout(dinoAccelerationTimeout, 100);
    }
    if (accelerationCounter.current === 1) {
      setIsDinoFlipping(true);
    }
  }, []);

  const dinoJumpButtonDownListener = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (
        ((event.type === "keydown" && (event as KeyboardEvent).key === " ") ||
          (event.type === "mousedown" && (event as MouseEvent).button === 0)) &&
        dinoState === "running" &&
        !isGameFinished
      ) {
        setDinoState("jumping");
        setDinoAcceleration(
          (previousAcceleration) =>
            previousAcceleration - minimumJumpAcceleration
        );
        accelerationCounter.current =
          maximumJumpAcceleration - minimumJumpAcceleration + 1;

        setTimeout(dinoAccelerationTimeout, 100);
      }
    },
    [dinoAccelerationTimeout, dinoState, isGameFinished]
  );

  const dinoJumpButtonUpListener = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (
        (event.type === "keyup" && (event as KeyboardEvent).key === " ") ||
        (event.type === "mouseup" && (event as MouseEvent).button === 0)
      ) {
        accelerationCounter.current = 0;
      }
    },
    []
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

  return {
    dinoState,
    dinoPosition,
    isDinoFlipping,
    isDinoOnTrain,
    dinoRef,
    startDino,
    stopDino,
  };
};

export default useDino;
