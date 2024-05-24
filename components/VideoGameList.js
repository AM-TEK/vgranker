import { useEffect, useState, useRef } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';
import VideoGameModal from './VideoGameModal';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [selectedVideoGame, setSelectedVideoGame] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const draggablesRef = useRef([]);
  const containersRef = useRef([]);

  useEffect(() => {
    fetch('http://localhost:8082/videoGames')
      .then(response => response.json())
      .then(data => setVideoGames(data));
  }, []);

  useEffect(() => {
    draggablesRef.current = document.querySelectorAll(".draggable");
    containersRef.current = document.querySelectorAll(".container");

    draggablesRef.current.forEach(draggable => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging")
      })

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging")
      })
    })
    
    containersRef.current.forEach(container => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector(".dragging")
        if (afterElement == null) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    });
  }, [videoGames]);

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")]
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child}
      } else {
        return closest
      }
    }, {offset: Number.NEGATIVE_INFINITY}).element
  }

  const handleVideoGameClick = (videoGame) => {
    setSelectedVideoGame(videoGame);
  };

  // const handleSortToTop = (index) => {
  //   const updatedVideoGames = [...videoGames]; // Create a copy of the current list
  //   const selectedVideoGame = updatedVideoGames.splice(index, 1)[0]; // Remove the clicked video game from the list
  //   updatedVideoGames.unshift(selectedVideoGame); // Insert the clicked video game at the beginning of the list
  //   setVideoGames(updatedVideoGames); // Update the state with the new sorted list
  // };
  
  const closeModal = () => {
    setSelectedVideoGame(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row w-2/3 max-h-screen py-4 overflow-y-auto bg-gray-300 rounded-lg">
        <div className="w-full lg:w-4/5 p-4">
          <button
            onClick={toggleFormVisibility}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isFormVisible ? 'Hide Form' : 'Show Form'}
          </button>
          {isFormVisible && (
            <VideoGameForm
              videoGames={videoGames}
              setVideoGames={setVideoGames}
            />
          )}
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <VideoGameCard 
            videoGames={videoGames}
            onClick={handleVideoGameClick}
          />
        </div>
      </div>
      {selectedVideoGame && (
        <VideoGameModal
          videoGame={selectedVideoGame}
          isOpen={Boolean(selectedVideoGame)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default VideoGameList;