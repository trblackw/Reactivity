import React, { useState, useEffect, useRef } from "react";

const Landing = () => {
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
        `http://hn.algolia.com/api/v1/search?query=${query}`,
        {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
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
      <img
        src="https://icon.now.sh/react/c0c"
        alt="react-logo"
        className="float-right h-12 logo"
      />
      <h1 className="text-grey-darkest font-semibold mb-2">Reactivity</h1>
      <small className="italic">Search for the latest in react news!</small>
      <form onSubmit={handleSearch} className="mb-3 p-2">
        <input
          type="text"
          placeholder="search"
          onChange={e => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded p-1 mx-2">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal text-white rounded p-1"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <h2 className="font-bold">loading...</h2>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(
            ({ url, title, objectID, points, author, num_comments }) => (
              <li key={objectID}>
                <div className="mb-5">
                  <h4>
                    <a
                      href={url}
                      className="text-indigo-dark hover:text-indigo-light"
                    >
                      {title}
                    </a>
                  </h4>
                  <div className="flex">
                    <div className="mx-2">
                      <img
                        src="https://icon.now.sh/thumb_up/c0c"
                        alt="react-logo"
                      />
                      <small className="font-bold">{points}</small>
                    </div>
                    <div className="mx-2">
                      <img
                        src="https://icon.now.sh/edit/6B8E23"
                        alt="react-logo"
                      />
                      <small className="font-bold">{author}</small>
                    </div>
                    <div className="mx-2">
                      <img
                        src="https://icon.now.sh/mode_comment/3397FF"
                        alt="react-logo"
                      />
                      <small className="font-bold">{num_comments}</small>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Landing;
