import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("stars");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default perPage
  const [page, setPage] = useState(1);

  const fetchAllPages = async (query, sort, perPage) => {
    let allResults = [];
    let currentPage = 1;
    let totalResults = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: { q: query, sort, per_page: perPage, page: currentPage },
      });
      if (response.data.items) {
        allResults = [...allResults, ...response.data.items];
        totalResults = response.data.total_count;
        currentPage += 1;
        hasMore = allResults.length < totalResults;
      } else {
        hasMore = false;
      }
    }
    return allResults;
  };

  const searchRepos = async (e) => {
    if (e) e.preventDefault();
    try {
      const allResults = await fetchAllPages(query, sort, perPage);
      setResults(allResults);
      setTotalPages(Math.ceil(allResults.length / perPage));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setTotalPages(0);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        sort,
        setSort,
        results,
        setResults,
        totalPages,
        setTotalPages,
        perPage,
        setPerPage, // Add setPerPage to context
        page,
        setPage,
        searchRepos,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchContext;
