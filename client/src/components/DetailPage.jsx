import { useContext } from "react";
import SearchContext from "../page/context/SearchContext";
import "../App.css";

function DetailPage() {
  const { results, perPage, page, setPage, totalResults } =
    useContext(SearchContext);

  const totalPages = Math.ceil(totalResults / perPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="grid-container">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((repo) => (
            <div key={repo.id} className="grid-item">
              <h3 className="repo-title">{repo.name}</h3>
              <p className="repo-description">{repo.description}</p>
              <p className="repo-details">
                <strong>Open Issues:</strong> {repo.open_issues_count}
              </p>
              <p className="repo-details">
                <strong>Default Branch:</strong> {repo.default_branch}
              </p>
              <p>
                Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
              >
                View Repository
              </a>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div className="pagination">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
