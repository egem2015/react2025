
import axios from "axios";

// Assuming your Spring Boot backend is running on localhost:8080
// Adjust this URL if your backend is on a different port or host
const API_URL = "https://react-springboot-app-backend3.onrender.com/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", { // Assuming your signup endpoint is /api/auth/signup
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", { // Assuming your signin endpoint is /api/auth/signin
      username,
      password,
    })
    .then((response) => {
        console.log("auth.service.js burada : "+JSON.stringify(response.data));

        console.log("auth.service.js token : "+JSON.stringify(response.data.token));
      // If login is successful, your backend should return user data and a JWT (JSON Web Token)
      // You typically store this user data (including the token and roles) in local storage
      if (response.data.token) { // Check for a token or other indicator of successful login

          console.log("auth.service.js localStorage : "+JSON.stringify(response.data));

        localStorage.setItem("user", JSON.stringify(response.data));

          const user = localStorage.getItem("user");
  if (user) {
    // Eğer veri varsa, JSON'a parse et ve döndür
   console.log("JSON.parse(user) : "+JSON.parse(user));
  }

      }
      return response.data; // Return the full response data
    });
};

const logout = () => {
  localStorage.removeItem("user"); // Clear user data from local storage
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;