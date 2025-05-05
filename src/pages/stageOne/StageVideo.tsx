import React, { useRef, useState } from 'react';

const StageVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="relative w-[375px] h-[220px] md:w-[537px] md:h-[392px] border-4 border-mainlight overflow-hidden bg-black mt-[66px] md:mt-[0px]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        onEnded={handleEnded}
        onClick={handleVideoClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      />
      <img
        src="/home-flame-video-desktop.png"
        alt="llamas"
        className={`absolute -bottom-[30px] bg-cover bg-no-repeat left-0 w-[537px] pointer-events-none select-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} md:block hidden`}
        style={{ zIndex: 2 }}
      />
      <img
        src="/home-flame-video-mobile.png"
        alt="llamas"
        className={`absolute -bottom-[0px] bg-cover bg-no-repeat left-0 w-[375px] pointer-events-none select-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} block md:hidden`}
        style={{ zIndex: 2 }}
      />
      <button
        onClick={handlePlay}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] flex items-center justify-center z-10 hover:scale-110 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ zIndex: 3 }}
        aria-label="Play video"
      >
        <img src="/home-video-play.svg" alt="Play" className="w-[32px] h-[31px] md:w-[60px] md:h-[60px]" />
      </button>
    </div>
  );
};

export default StageVideo; 