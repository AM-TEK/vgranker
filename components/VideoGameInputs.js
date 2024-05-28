import React from 'react';

const VideoGameInputs = ({ index, formData, handleChange }) => {
  return (
    <div className='mb-5'>
      <div className="w-full mx-auto">
        <input
          type="text"
          id={`title${index}`}
          name={`title${index}`}
          placeholder={`${index + 1}: Title *`}
          value={formData[`title${index}`] || ''}
          onChange={handleChange}
          required
          className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-full mx-auto">
        <input
          type="text"
          id={`developer${index}`}
          name={`developer${index}`}
          placeholder={`${index + 1}: Developer`}
          value={formData[`developer${index}`] || ''}
          onChange={handleChange}
          className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-full mx-auto">
        <input
          type="text"
          id={`year${index}`}
          name={`year${index}`}
          placeholder={`${index + 1}: Year`}
          value={formData[`year${index}`] || ''}
          onChange={handleChange}
          className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-full mx-auto">
        <input
          type="text"
          id={`platform${index}`}
          name={`platform${index}`}
          placeholder={`${index + 1}: Platform`}
          value={formData[`platform${index}`] || ''}
          onChange={handleChange}
          className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default VideoGameInputs;
