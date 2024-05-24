import { useEffect, useState } from 'react';

const VideoGameForm = ({ videoGames, setVideoGames }) => {
  const [formData, setFormData] = useState({
    title: '',
    developer: '',
    year: '',
  });
  const [numGames, setNumGames] = useState(1);
  const [listName, setListName] = useState('');

  useEffect(() => {
    setListName('VGs: 1990-2009');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;
    for (let i = 0; i < numGames; i++) {
      if (formData[`title${i}`].trim() === '') {
        isFormValid = false;
        break;
      }
    }
    if (isFormValid) {
      const newGames = Array.from({ length: numGames }, (_, index) => ({
        id: videoGames.length + index + 1,
        title: formData[`title${index}`],
        developer: formData[`developer${index}`],
        year: formData[`year${index}`],
      }));
      setVideoGames(newGames);
      setFormData({
        title: '',
        developer: '',
        year: '',
      });
      setListName('');
    } else {
      alert('Title is required');
    }
  };
  
  const handleNumGamesChange = (e) => {
    setNumGames(parseInt(e.target.value, 10));
  };

  const renderGameInputs = () => {
    return Array.from({ length: numGames }).map((_, index) => (
      <div key={index} className='mb-5'>
        <div className='w-1/2'>
          <label htmlFor={`title${index}`} className="block text-sm font-medium text-gray-700">
            {index + 1}: Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={`title${index}`}
            name={`title${index}`}
            value={formData[`title${index}`] || ''}
            onChange={handleChange}
            required
            className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='w-1/2'>
          <label htmlFor={`developer${index}`} className="block text-sm font-medium text-gray-700">
            {index + 1}: Developer 
          </label>
          <input
            type="text"
            id={`developer${index}`}
            name={`developer${index}`}
            value={formData[`developer${index}`] || ''}
            onChange={handleChange}
            className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='w-1/2'>
          <label htmlFor={`year${index}`} className="block text-sm font-medium text-gray-700">
            {index + 1}: Year
          </label>
          <input
            type="text"
            id={`year${index}`}
            name={`year${index}`}
            value={formData[`year${index}`] || ''}
            onChange={handleChange}
            className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='w-1/2'>
          <label htmlFor={`platform${index}`} className="block text-sm font-medium text-gray-700">
            {index + 1}: Platform
          </label>
          <input
            type="text"
            id={`platform${index}`}
            name={`platform${index}`}
            value={formData[`platform${index}`] || ''}
            onChange={handleChange}
            className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    ));
  };

  return (
    

    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <div className='w-1/4'>
          <label htmlFor="numGames" className="block text-sm font-medium text-gray-700">
            Number of Video Games <span className="text-red-500">*</span>
          </label>
          <select
            id="numGames"
            name="numGames"
            value={numGames}
            onChange={handleNumGamesChange}
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
      <div className='text-center mb-4'>
        {listName && 
          <h2 className="text-xl font-semibold mt-4">
            {listName}
          </h2>
        }
      </div>
    </form>
  );
};

export default VideoGameForm;