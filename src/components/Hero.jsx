import React from "react";

const Hero = () => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      // Asegurar que el video se reproduce correctamente
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Error reproduciendo video:", error);
        });
      }
    }
  }, []);

  return (
    // CONTAINER HERO
    <div className="relative w-screen h-dvh min-h-[320px] lg:mt-12 flex items-center justify-center ">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute z-0 w-full h-dvh brightness-50 top-0 left-0 object-cover"
      >
        <source src="/vids/LeonVSChris.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 w-full flex flex-col items-center  justify-center text-center lg:align-top lg:items-end lg:text-right lg:pr-20 px-4">
        <h1 className="text-7xl sm:text-9xl lg:text-9xl 3724-font text-red-400 mb-4 leading-tight uppercase drop-shadow-2xl opacity-100">
          Los sabores se
          <br />
          descontrolaron
        </h1>
        <p className="text-5xl sm:text-2xl lg:text-6xl 3724-font drop-shadow-xl">
          ahora solo queda sobrevivir al menú
        </p>
      </div>
    </div>
  );
};

export default Hero;
