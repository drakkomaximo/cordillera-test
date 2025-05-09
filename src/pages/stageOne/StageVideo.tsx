import React, { useRef, useState } from 'react';
import Image from 'next/image';

const StageVideo = ({ layoutOnly = false }: { layoutOnly?: boolean }) => {
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
    <div className="relative w-[375px] h-[220px] md:max-w-[537px] md:h-[392px] border-4 border-mainlight overflow-hidden bg-black mt-0">
      {!layoutOnly && (
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
      )}
      <Image
        src="/home-flame-video-desktop.png"
        alt="llamas"
        width={537}
        height={60}
        className={`absolute -bottom-[30px] bg-cover bg-no-repeat left-0 w-[537px] pointer-events-none select-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} md:block hidden`}
        style={{ zIndex: 2 }}
        priority={false}
      />
      <Image
        src="/home-flame-video-mobile.png"
        alt="llamas"
        width={375}
        height={60}
        className={`absolute -bottom-[0px] bg-cover bg-no-repeat left-0 w-[375px] pointer-events-none select-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} block md:hidden`}
        style={{ zIndex: 2 }}
        priority={false}
      />
      {!layoutOnly && (
        <button
          onClick={handlePlay}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] flex items-center justify-center z-10 hover:scale-110 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ zIndex: 3 }}
          aria-label="Play video"
        >
          <Image src="/home-video-play.svg" alt="Play" width={60} height={60} className="w-[32px] h-[31px] md:w-[60px] md:h-[60px]" />
        </button>
      )}
    </div>
  );
};

export default StageVideo; 