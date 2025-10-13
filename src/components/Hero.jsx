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
    <div className="w-screen h-dvh flex items-center sm:pr-20 ">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute object-cover z-0 sm:w-full sm:h-full sm:min-w-[100vw] sm:min-h-[100dvh] w-screen h-[60vh] min-h-[320px]"
        style={{
          top: "0",
          left: "0",
          objectFit: "cover",
        }}
      >
        <source src="/vids/LeonVSChris.mp4" type="video/mp4" />
      </video>

      {/* OSCURECE VIDEO */}
      <div className="absolute inset-0 bg-black bg-opacity-60 sm:bg-opacity-40 z-5"></div>

      <div className="text-right drop-shadow-px-4 py-8 w-full">
        <h1 className="sm:text-9xl lg:text-9xl 3724-font text-red-400 mb-4 leading-tight uppercase drop-shadow-2xl opacity-100">
          Los sabores se
          <br />
          descontrolaron
        </h1>
        <p className="text-2xl lg:text-6xl 3724-font  drop-shadow-xl">
          ahora solo queda sobrevivir al menú
        </p>
      </div>
    </div>
  );
};

export default Hero;
