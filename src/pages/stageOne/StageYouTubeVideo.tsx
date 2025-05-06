declare global {
  interface Window {
    YT: {
      Player: {
        new (elementId: string | HTMLElement, options: unknown): {
          playVideo: () => void;
          pauseVideo: () => void;
          seekTo: (seconds: number) => void;
          destroy: () => void;
        };
      };
      PlayerState: {
        PLAYING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const YOUTUBE_VIDEO_ID = 'KKfVPDH-n1s';

const StageYouTubeVideo = () => {
  const playerRef = useRef<InstanceType<typeof window.YT.Player> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!showPlayer) return;
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [showPlayer]);

  const createPlayer = () => {
    if (!containerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        iv_load_policy: 3,
        disablekb: 1,
        playsinline: 1,
        cc_load_policy: 0,
        autohide: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: () => {
          if (playerRef.current) {
            playerRef.current.playVideo();
          }
        },
        onStateChange: (event: { data: number }) => {
          if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
          else setIsPlaying(false);
        },
      },
    });
  };

  const fadeClass = isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto';

  const handleGlobalClick = () => {
    if (showPlayer && playerRef.current) {
      playerRef.current.playVideo();
    } else {
      setShowPlayer(true);
    }
  };

  return (
    <div className="relative w-full h-[220px] md:h-[392px] border-4 border-mainlight overflow-hidden mt-0">
      <div className={`absolute inset-0 bg-[#15151E] transition-opacity duration-500 ${fadeClass}`} style={{ zIndex: 1 }} />
      <Image
        src="/home-flame-video-desktop.png"
        alt="llamas"
        width={537}
        height={60}
        className={`absolute -bottom-[30px] bg-cover bg-no-repeat left-0 w-full select-none md:block hidden transition-opacity duration-500 ${fadeClass}`}
        style={{ zIndex: 2 }}
        priority={false}
      />
      <Image
        src="/home-flame-video-mobile.png"
        alt="llamas"
        width={375}
        height={60}
        className={`absolute -bottom-[0px] w-full bg-cover bg-no-repeat left-0 select-none block md:hidden transition-opacity duration-500 ${fadeClass}`}
        style={{ zIndex: 2 }}
        priority={false}
      />
      {!isPlaying && (
        <div
          className={`absolute inset-0 z-20 ${fadeClass}`}
          onClick={handleGlobalClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: 'pointer' }}
        />
      )}
      <button
        tabIndex={-1}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] flex items-center justify-center z-30 transition-all duration-500 ${fadeClass} ${isHovered ? 'scale-110' : 'scale-100'}`}
        aria-label="Reproducir video"
        type="button"
        style={{ pointerEvents: 'none' }}
      >
        <Image src="/home-video-play.svg" alt="Play" width={60} height={60} className="w-[32px] h-[31px] md:w-[60px] md:h-[60px]" />
      </button>
      {showPlayer && (
        <div
          ref={containerRef}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default StageYouTubeVideo; 