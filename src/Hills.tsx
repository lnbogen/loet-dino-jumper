import WorldElement from "./WorldElement";

import Hills1 from "./assets/hills-1.png";
import Hills2 from "./assets/hills-2.png";
import Hills3 from "./assets/hills-3.png";
import Volcano from "./assets/volcano.png";

interface HillsProps {
  dinoSpeed: number;
}

const Hills = ({ dinoSpeed }: HillsProps) => (
  <>
    <WorldElement
      speed={dinoSpeed * 0.5}
      tileWidth={1000}
      tileHeight={697}
      tileUrl={Volcano}
    />
    <WorldElement
      speed={dinoSpeed}
      tileWidth={800}
      tileHeight={340}
      tileUrl={Hills3}
    />
    <WorldElement
      speed={dinoSpeed * 1.25}
      tileWidth={500}
      tileHeight={196}
      tileUrl={Hills2}
    />
    <WorldElement
      speed={dinoSpeed * 2}
      tileWidth={400}
      tileHeight={91}
      tileUrl={Hills1}
    />
  </>
);

export default Hills;
