import player1Img from "./assets/images/player.png";
import player2Img from "./assets/images/player2.png";

export const PlayerIcon = ({
  isMyPlayer = false,
  additionalClass = "w-8 h-8",
}: {
  isMyPlayer?: boolean;
  additionalClass?: string;
}) => {
  return (
    <div
      className={`${
        isMyPlayer ? "bg-red-500" : "bg-blue-500"
      } rounded-full flex items-center justify-center ${additionalClass}`}
    >
      <img
        src={isMyPlayer ? player1Img : player2Img}
        alt="icon"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};
