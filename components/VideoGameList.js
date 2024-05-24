import { useEffect, useState, useRef } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';
import VideoGameModal from './VideoGameModal';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [selectedVideoGame, setSelectedVideoGame] = useState(null);
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

  const closeModal = () => {
    setSelectedVideoGame(null);
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 max-h-screen py-4 overflow-y-auto bg-gray-300 rounded-lg">
        <VideoGameForm
          videoGames={videoGames}
          setVideoGames={setVideoGames}
        />
        <VideoGameCard 
          videoGames={videoGames}
          onClick={handleVideoGameClick}
        />
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