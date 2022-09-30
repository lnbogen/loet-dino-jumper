import WorldElement from "./WorldElement";

import GroundTexture from "./assets/ground.png";

interface GroundProps {
  dinoSpeed: number;
}

const Ground = ({ dinoSpeed }: GroundProps) => (
  <WorldElement
    speed={dinoSpeed * 4}
    tileWidth={267}
    tileHeight={200}
    tileUrl={GroundTexture}
  />
);

export default Ground;
