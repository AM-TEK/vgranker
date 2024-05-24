// VideoGameModal.jsx
import React from 'react';

const VideoGameModal = ({ videoGame, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg">
        <button onClick={onClose} className="float-right">Close</button>
        <h2 className="mb-4 text-xl font-bold">{videoGame.title}</h2>
        <p><strong>Developer:</strong> {videoGame.developer}</p>
        <p><strong>Year:</strong> {videoGame.year}</p>
      </div>
    </div>
  );
};

export default VideoGameModal;