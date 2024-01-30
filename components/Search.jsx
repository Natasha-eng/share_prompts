const Search = ({ searchText, handleSearchChange }) => {
  return (
    <form className="relative w-full flex-center">
      <input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        className="search_input peer"
      />
    </form>
  );
};

export default Search;
