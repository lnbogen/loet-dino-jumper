import Gem from "./Gem";
import useGems from "./useGems";

import GemUrl from "./assets/gem-1.png";

import "./Gems.css";

interface GemsProps {
  dinoSpeed: number;
  dinoRef: React.RefObject<HTMLDivElement>;
}

const Gems = ({ dinoSpeed, dinoRef }: GemsProps) => {
  const { gems, gemCounter, onTakeGem } = useGems({ dinoSpeed });

  return (
    <>
      <div className="gem-counter">
        <img src={GemUrl} alt="" />
        <span>{gemCounter}</span>
      </div>
      <div className="gems-wrapper">
        {gems.map((gem) => (
          <Gem
            key={gem.id}
            id={gem.id}
            bottom={gem.bottom}
            left={gem.left}
            imageUrl={gem.imageUrl}
            dinoRef={dinoRef}
            onTakeGem={onTakeGem}
            isTaken={gem.isTaken}
          />
        ))}
      </div>
    </>
  );
};

export default Gems;
