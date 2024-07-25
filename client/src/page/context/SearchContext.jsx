import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("stars");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchAllPages = async () => {
    let allResults = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await axios.get("http://localhost:5000/api/search", {
          params: { q: query, sort, per_page: perPage, page: currentPage },
        });

        if (response.data.items.length === 0) break;

        allResults = [...allResults, ...response.data.items];
        totalPages = Math.ceil(response.data.total_count / perPage);
        currentPage++;
      }

      setResults(allResults);
      setTotalResults(allResults.length);

      // Navigate to the detail page after fetching all data
      navigate("/repo/detail", {
        state: {
          results: allResults,
          perPage: perPage,
          totalResults: allResults.length,
        },
      });
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Rate limit exceeded. Please try again later.");
      } else {
        console.error("Error fetching search results:", error);
      }
      setResults([]);
      setTotalResults(0);
    }
  };

  const searchRepos = async (e) => {
    if (e) e.preventDefault();
    await fetchAllPages();
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
        totalResults,
        setTotalResults,
        perPage,
        setPerPage,
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
