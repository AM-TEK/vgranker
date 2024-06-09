const ListNameVideoGameInput = ({ listName, onChange }) => {
  return (
    <div className="mb-4">
      <div className="w-4/5 mx-auto">
        <label htmlFor="listName" className="block text-sm font-medium text-white">
          Video Game List Name
        </label>
        <input
          type="text"
          id="listName"
          name="listName"
          value={listName}
          onChange={onChange}
          className="block w-full pl-4 mb-2 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-fuchsia-500"
        />
      </div>
    </div>
  );
};

export default ListNameVideoGameInput;
