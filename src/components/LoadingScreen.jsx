import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const resources = [
      '/vids/LeonVSChris.mp4',
      '/imgs/Licker.webp',
      '/imgs/Jill.webp',
      '/imgs/Leon.webp',
      '/imgs/Nemesis.webp',
      '/imgs/ReinaRoja.webp',
      '/imgs/BOW.webp'
    ];

    let loadedResources = 0;
    const totalResources = resources.length;

    const updateProgress = () => {
      loadedResources++;
      const progress = (loadedResources / totalResources) * 100;
      setLoadingProgress(progress);
      
      if (loadedResources === totalResources) {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onLoadComplete();
          }, 300);
        }, 500);
      }
    };

    // Precargar video
    const video = document.createElement('video');
    video.src = '/vids/LeonVSChris.mp4';
    video.preload = 'metadata';
    video.onloadedmetadata = updateProgress;
    video.onerror = updateProgress;

    // Precargar imágenes
    resources.slice(1).forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    return () => {
      video.remove();
    };
  }, [onLoadComplete]);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl 3724-font text-white drop-shadow-lg mb-8">
          <span className="text-red-500">T-B</span>URGER<span className="text-red-500">.L</span>ABS
        </h1>
        <div className="w-96 h-6 bg-gray-900 border-2 border-red-800 rounded-sm overflow-hidden shadow-lg">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-out border-r border-red-400"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;