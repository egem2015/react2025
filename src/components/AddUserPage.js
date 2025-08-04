import React, { useState } from 'react';
import userService from './user.service';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için

const AddUserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Roller için şimdilik basit bir array kullanacağız.
  // Gelişmiş durumda, tüm rolleri backend'den çekip checkbox listesi yapabilirsiniz.
  const [roles, setRoles] = useState(['ROLE_USER']); // Varsayılan olarak ROLE_USER
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate(); // Yönlendirme hook'u

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage(''); // Önceki mesajları temizle
    setSuccessful(false);

    // Form validasyonu (basit kontrol)
    if (!username || !email || !password) {
      setMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // Backend'e gönderilecek userData objesi
      // Roller string dizisi olarak gönderiliyor.
      const userData = {
        username,
        email,
        password,
        roles: roles, 
      };

      // UserService üzerinden API çağrısı yap
      const response = await userService.createUser(userData);
      
      setMessage(response.data.message || 'Kullanıcı başarıyla eklendi!');
      setSuccessful(true);
      // Başarılı eklemeden sonra kullanıcı listesi sayfasına yönlendir
      navigate('/admin/users'); 

    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  // Basit stil tanımlamaları
  const formContainerStyle = {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
    backgroundColor: '#fff',
  };

  const buttonStyle = {
    padding: '12px 25px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '17px',
    marginTop: '20px',
    width: '100%',
  };

  const messageStyle = {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    color: successful ? '#28a745' : '#dc3545', // Yeşil başarı, kırmızı hata
    backgroundColor: successful ? '#e6ffe6' : '#ffe6e6',
    border: `1px solid ${successful ? '#28a745' : '#dc3545'}`,
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Yeni Kullanıcı Ekle</h2>
      <form onSubmit={handleAddUser}>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>E-posta:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="roles" style={labelStyle}>Roller:</label>
          {/* Çoklu seçim için veya daha gelişmiş bir rol yönetimi için burayı değiştirebilirsiniz */}
          <select
            id="roles"
            value={roles[0]} // Sadece ilk rolü gösteriyoruz
            onChange={(e) => setRoles([e.target.value])} // Şimdilik sadece tek bir rol seçimi için
            style={selectStyle}
          >
            <option value="ROLE_USER">Kullanıcı (ROLE_USER)</option>
            <option value="ROLE_MODERATOR">Moderatör (ROLE_MODERATOR)</option>
            <option value="ROLE_ADMIN">Yönetici (ROLE_ADMIN)</option>
          </select>
          <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>Tek bir rol seçin.</small>
        </div>

        <button type="submit" style={buttonStyle}>Kullanıcı Ekle</button>

        {message && (
          <div style={messageStyle}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUserPage;