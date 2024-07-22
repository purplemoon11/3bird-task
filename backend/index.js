import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

//cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

/**
 *  Third party api integration to fetch data
 */

app.get("/api/search", async (req, res) => {
  const { q, sort = "stars", per_page = 10, page = 1 } = req.query;

  if (!q) {
    return res.status(400).send("Search query (q) is required");
  }

  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        params: { q, sort, per_page, page },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res
      .status(error.response?.status || 500)
      .send(error.message || "An error occurred");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
