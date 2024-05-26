import { useEffect, useState } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';
import useDragAndDrop from '../hooks/useDragAndDrop';

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [listName, setListName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/videoGames`)
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

  useDragAndDrop(videoGames, setVideoGames);
  
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFormSubmit = (newVideoGames, newListName) => {
    setVideoGames(newVideoGames);
    setIsFormVisible(false);
    setListName(newListName);
  };
  
  const saveListOrder = () => {
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


  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2/3 max-h-screen py-4 overflow-y-auto bg-gray-300 rounded-lg lg:flex-row">
        <div className="w-full p-4 lg:w-4/5">
          {listName && (
            <div className='mb-4 text-center'>
              <h2 className="mt-4 text-xl font-semibold">
                {listName}
              </h2>
            </div>
          )}
          <button
            onClick={toggleFormVisibility}
            className="px-4 py-2 mb-4 text-white bg-black border rounded hover:bg-gray-600"
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
            onClick={saveListOrder}
            className="px-4 py-2 mt-4 text-white bg-blue-600 border rounded hover:bg-blue-800"
          >
            Save Order
          </button>
        </div>
        <div className="w-full p-4 lg:w-2/3">
          <VideoGameCard 
            videoGames={videoGames}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoGameList;
