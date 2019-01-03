import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults(query);
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      const { hits } = await res.json();
      setResults(hits);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };
  return (
     <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
        <img src="https://icon.now.sh/react/c0c" alt="react-logo" className="float-right h-12"/>
        <h1 className="text-grey-darkest font-thin mb-2">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-3 p-2">
        <input
          type="text"
          placeholder="search"
          onChange={e => setQuery(e.target.value)}
          value={query}
              ref={searchInputRef}
              className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded p-1 mx-2">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal text-white rounded p-1">
          Clear
        </button>
      </form>
      {loading ? (
        <h2 className="font-bold">loading...</h2>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(({ url, title, objectID }) => (
            <li key={objectID}>
              <h4>
                <b>
                  <a href={url} className="text-indigo-dark hover:text-indigo-light">{title}</a>
                </b>
              </h4>
            </li>
          ))}
        </ul>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default App;
