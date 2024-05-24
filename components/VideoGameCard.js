
const VideoGameCard = ({ videoGames, onClick }) => {
  const getPlatformGradientClass = (platform) => {
    switch (platform) {
      case 'NES':
        return 'bg-nes-custom-gradient';
      case 'Genesis':
        return 'bg-genesis-custom-gradient';
      case 'Dreamcast':
        return 'bg-dreamcast-custom-gradient';
      case 'SNES':
        return 'bg-snes-custom-gradient';
      case 'N64':
        return 'bg-n64-custom-gradient';
      case 'Gamecube':
        return 'bg-gamecube-custom-gradient';
      case 'GameboyAdvance':
        return 'bg-gba-custom-gradient';
      case 'PS2':
        return 'bg-ps2-custom-gradient';
      case 'PS3':
        return 'bg-ps3-custom-gradient';
      case 'Xbox':
        return 'bg-xbox-custom-gradient';
      case 'Xbox360':
        return 'bg-xbox360-custom-gradient';
      case 'WindowsPC':
        return 'bg-windowspc-custom-gradient';
      default:
        return 'bg-gray-200';
    }
  };
  return (
    <div className="container grid items-center justify-center gap-2 grid-cols">
      {videoGames.map((videoGame, index) => (
        <div 
          key={index} 
          onClick={() => onClick(videoGame)}
          draggable="true"
          className={`relative flex flex-col min-h-[120px] w-4/5 p-2 text-black border border-gray-400 rounded-md cursor-move draggable justify-self-center ${getPlatformGradientClass(videoGame.platform)}`}>
            <h2 className="font-bold text-md">{videoGame.title}</h2>
            <div className="absolute bottom-2 right-2 text-right">
            <p className="text-sm font-bold">{videoGame.developer}</p>
            <p className="text-sm font-bold">{videoGame.platform}</p>
            <p className="text-sm font-bold">{videoGame.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGameCard;