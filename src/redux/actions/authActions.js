import authService from '../../auth.service'; // Ensure this path is correct
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  SET_MESSAGE, // You might need a SET_MESSAGE type for displaying messages
} from '../types'; // Ensure all types are imported and defined in types.js

// You might also need a message action creator if it's not defined elsewhere
// For example:
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const login = (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    // authService.login'den doğrudan dönen veri 'userData' argümanına atanır.
    // Artık 'response.data' değil, direkt 'userData'dır.
    (userData) => { 
      // Şimdi console.log'u direkt userData'yı gösterecek şekilde güncelleyelim
      console.log("Gelen yanıtın veri kısmı (userData): ", userData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: userData }, // user objesini doğrudan userData olarak gönderiyoruz
      });

      // Eğer backend yanıtında bir mesaj alanı varsa ve kullanıyorsanız
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: userData.message || "Giriş başarılı.",
      // });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      // Dispatch a message action if you have one
      // dispatch(setMessage(message));

      // This ensures the .catch() in the component works
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const register = (username, email, password) => (dispatch) => {
  // Similar structure for register
  return authService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      // dispatch(setMessage(response.data.message));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });
      // dispatch(setMessage(message));
      return Promise.reject();
    }
  );
};