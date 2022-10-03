import { useState, useCallback, useRef } from "react";

const useTrain = () => {
  const trainRef = useRef<HTMLDivElement>(null);

  const [isTrainGoing, setIsTrainGoing] = useState(false);

  const onStartTrain = useCallback(() => {
    setIsTrainGoing(true);
  }, []);

  const onStopTrain = useCallback(() => {
    setIsTrainGoing(false);
  }, []);

  return {
    trainRef,
    isTrainGoing,
    onStartTrain,
    onStopTrain,
  };
};

export default useTrain;
