import { useEffect, useMemo, useState } from 'react';
import VideoGameCard from './VideoGameCard';
import VideoGameForm from './VideoGameForm';
import SavedLists from './SavedLists';
import useDragAndDrop from '../hooks/useDragAndDrop';
import useMoveCardToTop from '@/hooks/useMoveCardToTop';
import videoGamesData from '../lib/data'

const VideoGameList = () => {
  const [videoGames, setVideoGames] = useState([]);
  const [listName, setListName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [savedLists, setSavedLists] = useState([]);
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

  const memoizedVideoGames = useMemo(() => videoGames, [videoGames]);
  
  useDragAndDrop(videoGames, setVideoGames);

  const moveCardToTop = useMoveCardToTop(setVideoGames);
  
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

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

  // save json file to local machine
  // const saveListOrder = () => {
  //   console.log('Video games order before saving:', videoGames);
  //   const jsonData = JSON.stringify(videoGames, null, 2);
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'videoGames.json';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };
  
  const saveListOrder = () => {
    const jsonData = JSON.stringify(videoGames, null, 2);
    const newList = { name: listName, index: savedLists.length };
    setSavedLists([...savedLists, newList]);
    localStorage.setItem(`list-${savedLists.length}`, jsonData);
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover bg-gradient-grid">
      <div className="flex flex-col w-full h-full max-w-md overflow-y-auto bg-gray-400 rounded-lg">
        <div className="w-full p-4">
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
              className="px-4 py-2 text-white border rounded bg-[#8c11a2] hover:bg-gray-600"
            >
              {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>
          </div>
          {isFormVisible && (
            <div className="flex justify-center">
              <div className="w-full lg:w-3/4">
                <VideoGameForm
                  videoGames={memoizedVideoGames}
                  onFormSubmit={handleFormSubmit}
                />
              </div>
            </div>
          )}
          {savedLists.length > 0 && (
            <SavedLists
              savedLists={savedLists}
              setListName={setListName}
              setVideoGames={setVideoGames}
            />
          )}
        </div>
        <div className="w-full p-4">
          <div className="flex justify-center mb-4">
            <button
              onClick={saveListOrder}
              className="px-4 py-2 text-white bg-[#02789c] border rounded hover:bg-blue-800"
            >
              Save List
            </button>
          </div>
          <VideoGameCard 
            videoGames={memoizedVideoGames}
            onClick={() => {}}
            onMoveToTop={moveCardToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoGameList;
