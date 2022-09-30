import WorldElement from "./WorldElement";

import Clouds from "./assets/clouds.png";

import "./Sky.css";

interface SkyProps {
  dinoSpeed: number;
}

const Sky = ({ dinoSpeed }: SkyProps) => (
  <div className="sky">
    <div className="sun" />
    <WorldElement
      speed={dinoSpeed * 0.1 + 0.05}
      tileWidth={960}
      tileHeight={343}
      tileUrl={Clouds}
      alignment="top"
    />
  </div>
);

export default Sky;
