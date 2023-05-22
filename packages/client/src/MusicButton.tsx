import { useState } from 'react';
import useSound from 'use-sound';

import adventureStartSong from './assets/music/adventureStarts.ogg';
import StopIcon from './icons/StopIcon';
import PlayIcon from './icons/PlayIcon';

export const MusicButton = () => {
  const shouldPlayMusic = localStorage.getItem("shouldPlayMusic") === "true";
  const [playMusic, setPlayMusic] = useState(shouldPlayMusic);

  const [play, { stop }] = useSound(adventureStartSong, {
    interrupt: true,
    volume: 0.5,
    loop: true,
    autoplay: shouldPlayMusic,
    onplay: () => setPlayMusic(true),
    onstop: () => setPlayMusic(false),
    onpause: () => setPlayMusic(false),
  });

  const handleMusic = () => {
    if (playMusic) {
      stop();
      localStorage.setItem("shouldPlayMusic", "false");
      setPlayMusic(false);
    } else {
      play();
      localStorage.setItem("shouldPlayMusic", "true");
      setPlayMusic(true);
    }
  };

  return (
    <button
      className="bg-white color-black px-2 py-2 rounded-full"
      onClick={handleMusic}
    >
      {playMusic ? (
        <span className="w-4 h-4">
          <StopIcon />
        </span>
      ) : (
        <span className="w-4 h-4">
          <PlayIcon />
        </span>
      )}
    </button>
  );
};
