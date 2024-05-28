import { useState } from 'react';

const useMoveToTop = (initialVideoGames) => {
  const [videoGames, setVideoGames] = useState(initialVideoGames);

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

  return { videoGames, moveCardToTop };
};

export default useMoveToTop;
