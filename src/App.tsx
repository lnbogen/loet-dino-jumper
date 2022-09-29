import Dino from "./Dino";

import "./App.css";

const App = () => (
  <div>
    <Dino state="running" />
    <Dino state="jumping" />
    <Dino state="idle" />
  </div>
);

export default App;
