import axios from 'axios';
import authService from '../auth.service'; // auth.service dosyanızın yolu

// Yeni bir Axios instance'ı oluşturun
const apiClient = axios.create({
  baseURL: 'https://react-springboot-app-backend3.onrender.com/api/', // Spring Boot API'nizin temel URL'si
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios isteği göndermeden önce çalışacak interceptor'ı ekle
apiClient.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser(); // localStorage'dan kullanıcı verisini çek

console.log("user.accessToken : "+user.token);

    if (user && user.token) { // Eğer kullanıcı giriş yapmış ve accessToken varsa
      // Authorization başlığına Bearer token'ı ekle
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config; // Değiştirilmiş isteği geri döndür
  },
  (error) => {
    return Promise.reject(error); // Hata durumunda isteği reddet
  }
);

export default apiClient; // Bu instance'ı diğer servis dosyalarında kullanacağız