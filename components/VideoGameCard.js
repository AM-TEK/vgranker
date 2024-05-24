
const VideoGameCard = ({ videoGames, onClick }) => {
  return (
    <div className="container grid items-center justify-center gap-2 grid-cols">
      {videoGames.map((videoGame, index) => (
        <div 
          key={index} 
          onClick={() => onClick(videoGame)}
          draggable="true"
          className="w-4/5 p-2 text-black bg-gray-200 border border-gray-400 rounded-md cursor-move draggable justify-self-center">
            <h2 className="font-semibold text-md">{videoGame.title}</h2>
            <p className="text-sm text-gray-500">{videoGame.developer}</p>
            <p className="text-sm text-gray-500">{videoGame.year}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoGameCard;