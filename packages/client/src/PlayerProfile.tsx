import player1Img from './assets/images/player.png';
import { useMUD } from './MUDContext';

export const shortString = (
  value: string,
  initialLength = 6,
  endLength = -4
): string => `${value.slice(0, initialLength)}...${value.slice(endLength)}`;

export const PlayerProfile = () => {
  const {
    network: { playerEntity },
  } = useMUD();

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
        <img
          src={player1Img}
          alt="icon"
          className="rounded-full"
        />
      </div>
      <p className="text-white">{shortString(playerEntity as string)}</p>
    </div>
  );
};
