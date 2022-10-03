import { useState, useCallback } from "react";

const useGame = () => {
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const [isGameFinished, setIsGameFinished] = useState(false);

  const onFinishGame = useCallback(() => {
    setIsGameFinished(true);
  }, []);

  return {
    isCountdownVisible,
    setIsCountdownVisible,
    isGameFinished,
    onFinishGame,
  };
};

export default useGame;
