const ListNameVideoGameInput = ({ listName, onChange }) => {
  return (
    <div className="mb-4">
      <div className="w-4/5 mx-auto">
        <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
          Video Game List Name
        </label>
        <input
          type="text"
          id="listName"
          name="listName"
          value={listName}
          onChange={onChange}
          className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default ListNameVideoGameInput;
