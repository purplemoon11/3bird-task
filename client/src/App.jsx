import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./page/context/SearchContext";
import SearchPage from "./controller/SearchPage";
import DetailPage from "./controller/SearchPage";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/repo/detail" element={<DetailPage />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
