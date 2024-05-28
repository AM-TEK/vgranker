import { useEffect, useState } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';
import useDragAndDrop from '../hooks/useDragAndDrop';
import useMoveToTop from '@/hooks/useMoveToTop';
import videoGamesData from '../lib/data'

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [listName, setListName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  // const [videoGames, setVideoGames] = useState(() => {
  //   const savedVideoGames = localStorage.getItem('videoGames');
  //   return savedVideoGames ? JSON.parse(savedVideoGames) : videoGamesData;
  // });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // console.log('API URL:', apiUrl);

  // api call to backend to get video games
  // useEffect(() => {
  //   fetch(`${apiUrl}/videoGames`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Fetched video games:', data);
  //       setVideoGames(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setVideoGames(videoGamesData)
  }, [])

  useDragAndDrop(videoGames, setVideoGames);
  
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  const handleFormSubmit = (newVideoGames, newListName) => {
    setVideoGames(newVideoGames);
    setIsFormVisible(false);
    setListName(newListName);
  };
  
  // api call to backend to save videogames
  // const saveListOrder = () => {
  //   console.log('Video games order before saving:', videoGames);
  //   fetch('http://localhost:8082/saveVideoGames', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(videoGames)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Response from backend:', data); // Log the response from the backend
  //   })
  //   .catch(error => console.error('Error saving video games:', error));
  // };

  const saveListOrder = () => {
    console.log('Video games order before saving:', videoGames);
    // localStorage.setItem('videoGames', JSON.stringify(videoGames));
  };

  const moveCardToTop = (id) => {
    setVideoGames((prevVideoGames) => {
      const cardIndex = prevVideoGames.findIndex((card) => card.id === id);
      if (cardIndex === -1) return prevVideoGames;
  
      const card = prevVideoGames[cardIndex];
      const updatedVideoGames = [
        card,
        ...prevVideoGames.slice(0, cardIndex),
        ...prevVideoGames.slice(cardIndex + 1),
      ];
      return updatedVideoGames;
    });
  };
  

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl max-h-screen py-4 overflow-y-auto bg-gray-300 rounded-lg lg:flex-row">
        <div className="w-full p-4 lg:w-2/5">
          {listName && (
            <div className='mb-4 text-center'>
              <h2 className="mt-4 text-xl font-semibold">
                {listName}
              </h2>
            </div>
          )}
          
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleFormVisibility}
              className="px-4 py-2 text-white bg-black border rounded hover:bg-gray-600"
            >
              {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>
            
          </div>
          
          {isFormVisible && (
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <VideoGameForm
                videoGames={videoGames}
                onFormSubmit={handleFormSubmit}
              />
            </div>
          </div>
        )}
          
        </div>
        <div className="w-full p-4 lg:w-3/5">
          <div className="flex justify-center mb-4">
            <button
              onClick={saveListOrder}
              className="px-4 py-2 text-white bg-blue-600 border rounded hover:bg-blue-800"
            >
              Save List
            </button>
          </div>
          <VideoGameCard 
            videoGames={videoGames}
            onClick={() => {}}
            onMoveToTop={moveCardToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoGameList;
