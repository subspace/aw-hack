export const Greeting = ({ onJoin }: { onJoin: () => void }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome, Player!</h1>
        <p className="mb-8">
          We are glad to have you here. Are you ready for an amazing adventure?
        </p>
        <button
          onClick={onJoin}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Join
        </button>
      </div>
    </div>
  );
};
