import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  console.log(results, "data");

  return (
    <div className="container">
      <h2>Repository Details</h2>
      <div className="grid-container">
        {results.length > 0 ? (
          results.map((repo) => (
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
    </div>
  );
}

export default DetailPage;
