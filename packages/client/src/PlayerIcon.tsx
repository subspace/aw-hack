import playerImg from './assets/player.png';

export const PlayerIcon = () => {
  return (
    <div
      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center" // w-8 h-8 translates to 32px in Tailwind
    >
      <img
        src={playerImg}
        alt="icon"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};
