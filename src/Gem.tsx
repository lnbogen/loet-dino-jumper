import classNames from "classnames";

import useGem from "./useGem";

import "./Gem.css";

interface GemProps {
  bottom: number;
  left: number;
  imageUrl: string;
  dinoRef: React.RefObject<HTMLDivElement>;
  isTaken: boolean;
  id: number;
  onTakeGem: (id: number) => void;
}

const Gem = ({
  bottom,
  left,
  imageUrl,
  dinoRef,
  isTaken,
  id,
  onTakeGem,
}: GemProps) => {
  const { gemRef } = useGem({ dinoRef, id, isTaken, onTakeGem });

  return (
    <div
      className={classNames("gem-wrapper", { taken: isTaken })}
      style={{
        bottom,
        left,
      }}
      ref={gemRef}
    >
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default Gem;
