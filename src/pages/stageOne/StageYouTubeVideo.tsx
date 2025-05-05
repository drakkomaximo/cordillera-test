// Declaración global para evitar errores de tipado con window.YT
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

import React, { useEffect, useRef, useState } from 'react';

const YOUTUBE_VIDEO_ID = 'KKfVPDH-n1s';

const StageYouTubeVideo = () => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Cargar el script de la API de YouTube solo una vez
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
    // Limpieza
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  // Crear el reproductor de YouTube
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
      },
      events: {
        onReady: () => setIsReady(true),
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
          else setIsPlaying(false);
          if (event.data === window.YT.PlayerState.ENDED) {
            playerRef.current.seekTo(0);
            playerRef.current.pauseVideo();
          }
        },
      },
    });
  };

  // Play/Pause personalizado
  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="relative w-[375px] h-[220px] md:w-[537px] md:h-[392px] border-4 border-mainlight overflow-hidden bg-black mt-[66px] md:mt-[0px]">
      {/* YouTube Player sin UI */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      {/* Imagen de llamas con transición */}
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
      {/* Botón play/pausa personalizado */}
      <button
        onClick={handlePlayPause}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] flex items-center justify-center z-10 hover:scale-110 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ zIndex: 3 }}
        aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        disabled={!isReady}
      >
        <img src="/home-video-play.svg" alt="Play" className="w-[32px] h-[31px] md:w-[60px] md:h-[60px]" />
      </button>
    </div>
  );
};

export default StageYouTubeVideo; 