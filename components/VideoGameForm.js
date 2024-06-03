import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import VideoGameInputs from './VideoGameInputs';
import NumVideoGamesInput from './NumVideoGamesInput';
import ListNameVideoGameInput from './ListNameVideoGameInput';
import videoGamesData from '../lib/data'

const VideoGameForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    developer: '',
    year: '',
    platform: '',
  });
  const [numVideoGames, setNumVideoGames] = useState(3);
  const [listName, setListName] = useState('');
  const platforms = [...new Set(videoGamesData.map((game) => game.platform))];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value,
    });
  };

  const handleNumVideoGamesChange = (e) => {
    const value = e.target.value;
    setNumVideoGames(value === '' ? '' : parseInt(value, 10));
  };  

  const createVideoGamesArray = () => {
    return Array.from({ length: numVideoGames }, (_, index) => {
      const title = formData[`title${index}`];
      const developer = formData[`developer${index}`];
      const yearValue = formData[`year${index}`];
      const platform = formData[`platform${index}`];

      const year = yearValue ? parseInt(yearValue, 10) : null;
      if (yearValue && isNaN(year)) {
        alert('Year must be a number');
        throw new Error('Year must be a number');
      }
      return {
        id: uuidv4(),
        title,
        developer,
        year,
        platform,
      };
    }).filter(game => game !== null);
  };

  const validateForm = () => {
    for (let i = 0; i < numVideoGames; i++) {
      if (formData[`title${i}`]?.trim() === '') {
        alert('Title is required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newVideoGames = createVideoGamesArray();
      onFormSubmit(newVideoGames, listName);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({});
    setNumVideoGames(3);
    setListName('');
  };

  const renderGameInputs = () => {
    return Array.from({ length: numVideoGames }).map((_, index) => (
      <VideoGameInputs
        key={index}
        index={index}
        formData={formData}
        handleChange={handleChange}
        platforms={platforms}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {listName && 
        <div className="mb-4 text-center">
          <h2 className="mt-4 text-xl font-semibold">
            {listName}
          </h2>
        </div>
      }
      <NumVideoGamesInput numVideoGames={numVideoGames} onChange={handleNumVideoGamesChange} />
      <ListNameVideoGameInput listName={listName} onChange={(e) => setListName(e.target.value)} />
      {renderGameInputs()}
      <div className="flex justify-center"> {/* Centering the button */}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-[#8c11a2] border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add List
        </button>
      </div>
    </form>
  );
};

export default VideoGameForm;

