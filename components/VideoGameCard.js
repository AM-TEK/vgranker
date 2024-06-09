import platformGradients from './PlatformGradients';
import { FaArrowUp } from 'react-icons/fa';

const getPlatformGradientClass = (platform) => {
  const gradientClass = platformGradients[platform] || platformGradients.default;
  return gradientClass;
};  

const VideoGameCard = ({ videoGames = [], onClick, onMoveToTop }) => {
  if (!videoGames || videoGames.length === 0) {
    return <p>No video games found.</p>;
  }

  return (
    <div className="container grid items-center justify-center gap-4 grid-cols">
      {videoGames.map(({ id, title, developer, platform, year }) => (
        <div 
          key={id}
          data-id={id} 
          onClick={() => onClick({ id, title, developer, platform, year })}
          draggable="true"
          className={`relative flex flex-col min-h-[120px] min-w-[200px] w-4/5 px-2 text-black border border-gray-400 rounded-md cursor-move draggable justify-self-center ${getPlatformGradientClass(platform)}`}>
            <h2 className="font-bold text-md">{title}</h2>
            <div className="absolute text-right bottom-2 right-2">
              <p className="text-sm">{developer}</p>
              <p className="text-sm">{platform}</p>
              <p className="text-sm">{year}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveToTop(id);
              }}
              className="absolute p-1 bg-gray-200 rounded-full bottom-2 left-2 hover:bg-gray-400"
            >
              <FaArrowUp />
            </button>
        </div>
      ))}
    </div>
  );
};

export default VideoGameCard;
