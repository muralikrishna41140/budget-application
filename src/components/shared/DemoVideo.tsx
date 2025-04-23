
import React from 'react';
import { PlayCircle } from 'lucide-react';

interface DemoVideoProps {
  onPlay: () => void;
  isPlaying: boolean;
}

const DemoVideo = ({ onPlay, isPlaying }: DemoVideoProps) => {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl">
      {isPlaying ? (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/7TWKKww-F30?autoplay=1&si=SvlD9_s2295weo7z"
          title="Money Mentor Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 animate-fade-in"
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-finance-mint to-finance-peach/30 dark:from-slate-900 dark:to-finance-navy/50">
          <img 
            src="https://img.youtube.com/vi/7TWKKww-F30/maxresdefault.jpg" 
            alt="Video Thumbnail"
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-90"
          />
          <div className="transform transition-transform hover:scale-110 z-10 animate-pulse-gentle">
            <div className="flex flex-col items-center">
              <div 
                className="rounded-full bg-white/90 dark:bg-black/50 p-4 cursor-pointer hover:bg-white dark:hover:bg-black/70 transition-colors shadow-lg"
                onClick={onPlay}
              >
                <PlayCircle className="w-14 h-14 text-primary" />
              </div>
              <p className="mt-4 font-medium text-gray-900 dark:text-gray-100 bg-white/30 dark:bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm shadow-glass">
                Watch how it works (2:15)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoVideo;
