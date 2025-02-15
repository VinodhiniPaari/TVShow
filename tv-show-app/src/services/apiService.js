const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const fetchTVShows = async (
  page = 0,
  size = 10,
  sortBy = "name",
  filter = ""
) => {
  try {
    const response = await fetch(
      `${API_URL}/tvshows?page=${page}&size=${size}&sortBy=${sortBy}&filter=${filter}`
    );
    if (!response.ok) throw new Error("Failed to fetch TV shows");

    const data = await response.json();

    if (!data || typeof data !== "object" || !Array.isArray(data.content)) {
      throw new Error("Invalid API response format.");
    }

    return {
      content: data.content,
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || 0,
    };
  } catch (error) {
    console.error("API Error:", error);
    return { content: [], totalPages: 1, totalElements: 0 };
  }
};

export const fetchShowDetails = async (title) => {
  try {
    const response = await fetch(
      `${API_URL}/tvshows/${encodeURIComponent(title)}`
    );
    if (!response.ok) throw new Error(`Failed to fetch details for ${title}`);

    const data = await response.json();

    return data || null;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
