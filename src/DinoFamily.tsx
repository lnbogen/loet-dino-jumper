import Dino from "./Dino";

import "./DinoFamily.css";

const DinoFamily = () => {
  return (
    <div className="dino-family-wrapper">
      <div className="dino-parent-wrapper">
        <Dino state="idle" position={0} />
      </div>
      <div className="dino-child-wrapper">
        <Dino state="idle" position={0} />
      </div>
    </div>
  );
};

export default DinoFamily;
