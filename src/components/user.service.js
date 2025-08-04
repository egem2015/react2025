import apiClient from './http-common'; // Daha önce oluşturduğunuz apiClient

class UserService {

   getAllUsers(page = 0, size = 5) { // Varsayılan değerler ekleyelim
    return apiClient.get(`/admin/users?page=${page}&size=${size}`);
  }


  getAllUsers2() {
    // Spring Boot'taki /api/admin/users endpoint'ini çağır
    return apiClient.get('/admin/users');
  }

    updateUser(id, userData) {

        console.log("userdata : "+JSON.stringify(userData));
    // Spring Boot'taki /api/admin/users/{id} endpoint'ine PUT isteği gönder
    return apiClient.put(`/admin/users/${id}`, userData);
  }

  createUser(userData) {
    // AuthController'daki /api/auth/admin/users/add endpoint'ine POST isteği
    return apiClient.post("/auth/admin/users/add", userData);
  }

  // Diğer kullanıcıya özel API çağrıları buraya eklenebilir
}

export default new UserService();