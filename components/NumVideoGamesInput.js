const NumVideoGamesInput = ({ numVideoGames, onChange }) => {
  return (
    <div className="mb-4">
      <div className="w-4/5 mx-auto">
        <label htmlFor="numVideoGames" className="block text-sm font-medium text-white">
          Number of Video Games <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="numVideoGames"
          name="numVideoGames"
          value={numVideoGames}
          min="3"
          onChange={onChange}
          className="block w-1/5 pl-4 mt-1 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-fuchsia-500"
        />
      </div>
    </div>
  );
};

export default NumVideoGamesInput;
