import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Book Service
export const bookService = {
  getAllBooks: async () => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/books`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching books", error);
      throw error;
    }
  },
};
