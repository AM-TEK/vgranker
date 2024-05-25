import { useEffect, useState, useRef } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [newVideoGames, setNewVideoGames] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const draggablesRef = useRef([]);
  const containersRef = useRef([]);

  useEffect(() => {
    fetch('http://localhost:8082/videoGames')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched video games:', data); // Debugging log
        setVideoGames(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error); // Debugging log
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    draggablesRef.current = document.querySelectorAll(".draggable");
    containersRef.current = document.querySelectorAll(".container");

    draggablesRef.current.forEach(draggable => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        updateVideoGamesOrder();
      });
    });

    containersRef.current.forEach(container => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });
  }, [videoGames]);

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  const updateVideoGamesOrder = () => {
    const newOrder = Array.from(containersRef.current[0].children).map((child, index) => {
      const id = child.getAttribute('data-id');
      const videoGame = videoGames.find(vg => vg.id === id);
      return { ...videoGame, order: index };
    });
    setVideoGames(newOrder);
  };

  const saveOrder = () => {
    console.log('Video games order before saving:', videoGames);
    fetch('http://localhost:8082/saveVideoGames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(videoGames)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from backend:', data); // Log the response from the backend
    })
    .catch(error => console.error('Error saving video games:', error));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFormSubmit = (newVideoGames) => {
    setVideoGames(newVideoGames);
    setIsFormVisible(false); // Hide the form after submission
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row w-2/3 max-h-screen py-4 overflow-y-auto bg-gray-300 rounded-lg">
        <div className="w-full lg:w-4/5 p-4">
          <button
            onClick={toggleFormVisibility}
            className="mb-4 px-4 py-2 text-white bg-black border hover:bg-gray-600 rounded"
          >
            {isFormVisible ? 'Hide Form' : 'Show Form'}
          </button>
          {isFormVisible && (
            <VideoGameForm
              videoGames={videoGames}
              onFormSubmit={handleFormSubmit}
            />
          )}
          <button
            onClick={saveOrder}
            className="mt-4 px-4 py-2 text-white bg-blue-600 border hover:bg-blue-800 rounded"
          >
            Save Order
          </button>
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <VideoGameCard 
            videoGames={videoGames}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoGameList;
