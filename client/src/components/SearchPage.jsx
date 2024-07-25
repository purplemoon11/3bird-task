import { useContext } from "react";
import SearchContext from "../page/context/SearchContext";
import "../App.css";

function SearchPage() {
  const { query, setQuery, sort, setSort, perPage, setPerPage, searchRepos } =
    useContext(SearchContext);

  return (
    <div className="container">
      <form onSubmit={searchRepos}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Repositories"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Updated</option>
        </select>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchPage;
