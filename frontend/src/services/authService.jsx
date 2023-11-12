import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Auth Service
export const authService = {
  login: async (email, password) => {
    try {
      //console.log(`Login URL: ${API_URL}/api/auth/login`);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        // Optionally save the token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data; // handle the error as needed
    }
  },

  register: async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.data.token) {
        // Optionally save the token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data; // handle the error as needed
    }
  },
};

export default authService;
