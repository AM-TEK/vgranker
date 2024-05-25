import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import VideoGameInputs from './VideoGameInputs';

const VideoGameForm = ({ videoGames, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    developer: '',
    year: '',
    platform: '',
  });
  const [numVideoGames, setNumVideoGames] = useState(1);
  const [listName, setListName] = useState('');

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

  const renderGameInputs = () => {
    return Array.from({ length: numVideoGames }).map((_, index) => (
      <VideoGameInputs
        key={index}
        index={index}
        formData={formData}
        handleChange={handleChange}
      />
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;
    for (let i = 0; i < numVideoGames; i++) {
      if (formData[`title${i}`].trim() === '') {
        isFormValid = false;
        break;
      }
    }
    if (isFormValid) {
      const newVideoGames = Array.from({ length: numVideoGames }, (_, index) => {
        const title = formData[`title${index}`];
        const developer = formData[`developer${index}`];
        const yearValue = formData[`year${index}`];
        const platform = formData[`platform${index}`];

        // Directly parse the year from the form data and validate
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

      onFormSubmit(newVideoGames, listName);
      setFormData({
        title: '',
        developer: '',
        year: '',
        platform: '',
      });
      setNumVideoGames(1);
      setListName('');
    } else {
      alert('Title is required');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {listName && 
        <div className='mb-4 text-center'>
          <h2 className="mt-4 text-xl font-semibold">
            {listName}
          </h2>
        </div>
      }
      <div className="mb-4">
        <div className='w-1/4'>
          <label htmlFor="numVideoGames" className="block text-sm font-medium text-gray-700">
            Number of Video Games <span className="text-red-500">*</span>
          </label>
          <select
            id="numVideoGames"
            name="numVideoGames"
            value={numVideoGames}
            onChange={handleNumVideoGamesChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[...Array(20)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mb-5'>
        <div className='w-1/2'>
          <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
            Video Game List Name
          </label>
          <input
            type="text"
            id="listName"
            name="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {renderGameInputs()}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 mb-5 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add List
      </button>
    </form>
  );
};

export default VideoGameForm;

