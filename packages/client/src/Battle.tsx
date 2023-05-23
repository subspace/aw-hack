import React, { useState } from "react";

import battleBackground from "./assets/images/battleBackground.png";
import { PlayerIcon } from "./PlayerIcon";
import SlashAnimation from "./SlashAnimation";
import FireAnimation from "./FireAnimation";

const Battle = () => {
  const [isSlashing, setIsSlashing] = useState(false);
  const [isFiring, setIsFiring] = useState(false);

  const handleSlash = () => {
    setIsSlashing(true);
    setTimeout(() => {
      setIsSlashing(false);
    }, 500); // Adjust the duration of the animation
  };

  const handleFire = () => {
    setIsFiring(true);
    setTimeout(() => {
      setIsFiring(false);
    }, 500); // Adjust the duration of the animation
  };

  return (
    <div
      className="flex z-10 items-end w-full h-full min-h-[1024px] min-w-[1024px]"
      style={{
        backgroundImage: `url(${battleBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="z-20 flex flex-col gap-10 w-full h-full">
        <div className="z-30 flex w-full h-full p-20">
          <div className=" place-self-end mt-10">
            <PlayerIcon
              isMyPlayer={true}
              additionalClass="w-60 h-60 drop-shadow-2xl"
            />
          </div>
          <div className="relative place-self-center ml-64 ">
            <div className="z-40 absolute inset-0">
              <SlashAnimation isSlashing={isSlashing} />
            </div>
            <div className="z-40 absolute inset-0">
              <FireAnimation isFiring={isFiring} />
            </div>
            <PlayerIcon additionalClass="w-60 h-60 drop-shadow-2xl" />
          </div>
        </div>
        <div className="z-40 w-full grid grid-cols-2">
          <button
            onClick={handleSlash}
            className="w-full bg-slate-200/75 py-10 px-40 items-center border border-gray-600 rounded-md"
          >
            Attack
          </button>
          <button
            onClick={handleFire}
            className="w-full bg-slate-200/75 py-10 px-40 items-center border border-gray-600 rounded-md"
          >
            Fire
          </button>
          <button className="w-full bg-slate-200/75 py-10 px-40 items-center border border-gray-600 rounded-md">
            Heal
          </button>
          <button className="w-full bg-slate-200/75 py-10 px-40 items-center border border-gray-600 rounded-md">
            Sample
          </button>
        </div>
      </div>
    </div>
  );
};

export default Battle;
