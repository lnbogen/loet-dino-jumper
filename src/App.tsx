import "./App.css";

import DinoIdle from "./assets/dino-idle.png";
import DinoRunning from "./assets/dino-running.png";
import DinoJumping from "./assets/dino-jumping.png";

const App = () => (
  <div>
    <div className="dino idle">
      <div>
        <img src={DinoIdle} alt="" />
      </div>
    </div>
    <div className="dino running">
      <div>
        <img src={DinoRunning} alt="" />
      </div>
    </div>
    <div className="dino jumping">
      <div>
        <img src={DinoJumping} alt="" />
      </div>
    </div>
  </div>
);

export default App;
