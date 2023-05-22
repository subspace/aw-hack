import React, { FC, useState } from "react";
import Animation from "./Animation";

import slashFrame1 from "./assets/images/slash/slash_01.png";
import slashFrame2 from "./assets/images/slash/slash_02.png";
import slashFrame3 from "./assets/images/slash/slash_03.png";
import slashFrame4 from "./assets/images/slash/slash_04.png";

interface SlashAnimationType {
  isSlashing: boolean;
}

const SlashAnimation: FC<SlashAnimationType> = ({ isSlashing }) => {
  return (
    <div>
      {isSlashing && (
        <Animation
          filterColor="invert(8%) sepia(70%) saturate(6936%) hue-rotate(358deg) brightness(84%) contrast(96%)"
          frames={[slashFrame1, slashFrame2, slashFrame3, slashFrame4]} // Pass in the slash animation frames
          frameDuration={100} // Adjust the duration of each frame
        />
      )}
    </div>
  );
};

export default SlashAnimation;
