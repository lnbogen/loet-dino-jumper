import { useEffect } from "react";
import "./Countdown.css";

interface CountdownProps {
  onHide: () => void;
}

const Countdown = ({ onHide }: CountdownProps) => {
  useEffect(() => {
    setTimeout(onHide, 8200);
  }, [onHide]);

  return (
    <div className="countdown">
      <div className="number three">3</div>
      <div className="number two">2</div>
      <div className="number one">1</div>
      <div className="number go">Go!</div>
    </div>
  );
};

export default Countdown;
