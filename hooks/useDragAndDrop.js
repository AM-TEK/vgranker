import { useEffect, useRef } from 'react';

const useDragAndDrop = (videoGames, setVideoGames) => {
  const draggablesRef = useRef([]);
  const containersRef = useRef([]);

  useEffect(() => {
    draggablesRef.current = document.querySelectorAll(".draggable");
    containersRef.current = document.querySelectorAll(".container");

    draggablesRef.current.forEach(draggable => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        updateVideoGamesOrder();
      });
    });

    containersRef.current.forEach(container => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    return () => {
      draggablesRef.current.forEach(draggable => {
        draggable.removeEventListener("dragstart", () => {
          draggable.classList.add("dragging");
        });
        draggable.removeEventListener("dragend", () => {
          draggable.classList.remove("dragging");
          updateVideoGamesOrder();
        });
      });

      containersRef.current.forEach(container => {
        container.removeEventListener("dragover", (e) => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container, e.clientY);
          const draggable = document.querySelector(".dragging");
          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });
      });
    };
  }, [videoGames]);

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  const updateVideoGamesOrder = () => {
    const newOrder = Array.from(containersRef.current[0].children).map((child, index) => {
      const id = child.getAttribute('data-id');
      const videoGame = videoGames.find(vg => vg.id === id);
      return { ...videoGame, order: index };
    });
    setVideoGames(newOrder);
  };

};

export default useDragAndDrop;
