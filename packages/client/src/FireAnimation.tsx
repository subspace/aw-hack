import React, { FC, useState } from "react";
import Animation from "./Animation";

import fireFrame1 from "./assets/images/fire/muzzle_01.png";
import fireFrame2 from "./assets/images/fire/muzzle_02.png";
import fireFrame3 from "./assets/images/fire/muzzle_03.png";
import fireFrame4 from "./assets/images/fire/muzzle_04.png";
import fireFrame5 from "./assets/images/fire/muzzle_05.png";

interface FireAnimationType {
  isFiring: boolean;
}

const FireAnimation: FC<FireAnimationType> = ({ isFiring }) => {
  return (
    <div>
      {isFiring && (
        <Animation
          filterColor="invert(8%) sepia(70%) saturate(6936%) hue-rotate(358deg) brightness(84%) contrast(96%)"
          frames={[fireFrame1, fireFrame2, fireFrame3, fireFrame4, fireFrame5]} // Pass in the slash animation frames
          frameDuration={100} // Adjust the duration of each frame
        />
      )}
    </div>
  );
};

export default FireAnimation;
