import classNames from "classnames";
import { useState } from "react";

import "./Splash.css";

interface SplashProps {
  onStartGame: () => void;
}

const Splash = ({ onStartGame }: SplashProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className={classNames("splash", { hidden: !isVisible })}>
      <h1>Loet's Bunny Jumper</h1>
      <button
        onClick={() => {
          setIsVisible(false);
          onStartGame();
        }}
        disabled={!isVisible}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      >
        Start
      </button>
    </div>
  );
};

export default Splash;
