const SavedLists = ({ savedLists, setListName, setVideoGames }) => {
  const handleLoadList = (index, name) => {
    const jsonData = localStorage.getItem(`list-${index}`);
    setListName(name);
    setVideoGames(JSON.parse(jsonData));
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-white">Saved Lists:</h3>
      <ul>
        {savedLists.map((list, index) => (
          <li key={index} className="mt-2 text-white">
            <a
              href="#"
              onClick={() => handleLoadList(list.index, list.name)}
            >
              {list.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLists;
