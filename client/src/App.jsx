import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./controller/SearchPage";
import DetailPage from "./controller/DetailPage";
import { SearchProvider } from "./page/context/SearchContext";

function App() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/repo/detail" element={<DetailPage />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
