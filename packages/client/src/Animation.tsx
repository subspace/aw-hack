import React, { useEffect, useState } from "react";

interface AnimationProps {
  frames: string[];
  frameDuration: number;
  filterColor: string;
}

const Animation: React.FC<AnimationProps> = ({
  frames,
  frameDuration,
  filterColor,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, frameDuration);

    return () => {
      clearInterval(animationInterval);
    };
  }, [frames, frameDuration]);

  return (
    <img
      style={{
        filter: filterColor,
      }}
      src={frames[currentFrame]}
      alt="Animation"
    />
  );
};

export default Animation;
