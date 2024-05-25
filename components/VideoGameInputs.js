import React from 'react';

const VideoGameInputs = ({ index, formData, handleChange }) => {
  return (
    <div className='mb-5'>
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
  );
};

export default VideoGameInputs;
