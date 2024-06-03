import { useCallback } from 'react';

const useMoveCardToTop = (setVideoGames) => {
  const moveCardToTop = useCallback((id) => {
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
  }, [setVideoGames]);

  return moveCardToTop;
};

export default useMoveCardToTop;
