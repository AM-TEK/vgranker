import React from 'react';

const VideoGameInputs = ({ index, formData, handleChange, platforms }) => {
  return (
    <div className='mb-5'>
      <div className="w-4/5 mx-auto">
        <input
          type="text"
          id={`title${index}`}
          name={`title${index}`}
          placeholder={`${index + 1}: Title *`}
          value={formData[`title${index}`] || ''}
          onChange={handleChange}
          required
          className="block w-full mb-2 placeholder-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-4/5 mx-auto">
        <input
          type="text"
          id={`developer${index}`}
          name={`developer${index}`}
          placeholder={`${index + 1}: Developer`}
          value={formData[`developer${index}`] || ''}
          onChange={handleChange}
          className="block w-full mb-2 placeholder-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-4/5 mx-auto">
        <input
          type="text"
          id={`year${index}`}
          name={`year${index}`}
          placeholder={`${index + 1}: Year`}
          value={formData[`year${index}`] || ''}
          onChange={handleChange}
          className="block w-full mb-2 placeholder-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-4/5 mx-auto">
        <select
          id={`platform${index}`}
          name={`platform${index}`}
          value={formData[`platform${index}`] || ''}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled hidden>
            Platform
          </option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoGameInputs;
