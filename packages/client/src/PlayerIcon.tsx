import player1Img from './assets/player.png';
import player2Img from './assets/player2.png';

export const PlayerIcon = ({
  isMyPlayer = false,
}: {
  isMyPlayer?: boolean;
}) => {
  return (
    <div
      className={`w-8 h-8 ${
        isMyPlayer ? 'bg-red-500' : 'bg-blue-500'
      } rounded-full flex items-center justify-center`}
    >
      <img
        src={isMyPlayer ? player1Img : player2Img}
        alt="icon"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};
