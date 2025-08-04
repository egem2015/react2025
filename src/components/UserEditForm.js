import React, { useState, useEffect } from 'react';

const UserEditForm = ({ user, onUpdate, onClose }) => {
  // Form alanları için state'ler
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // Bu state, backend'e gidecek olan string formatındaki rolleri tutacak
  const [roles, setRoles] = useState([]); 
  
   const availableRoles = ['ROLE_USER', 'ROLE_ADMIN'];

  // Komponent ilk yüklendiğinde veya 'user' prop'u değiştiğinde form alanlarını doldurur.
  // Backend'den gelen obje formatındaki rolleri, string dizisi formatına dönüştürür.
  useEffect(() => {
    if (user) {
      setId(user.id || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      
      // Backend'den gelen rollerin [{name: "ROLE_USER"}, ...] gibi obje dizisi olduğundan emin olun
      // ve bunları ["ROLE_USER", ...] gibi string dizisine dönüştürün.
      if (user.roles && Array.isArray(user.roles)) {
        setRoles(user.roles.map(roleObj => roleObj.name || '')); 
      } else {
        setRoles([]); // Rol yoksa veya beklenen formatta değilse boş dizi ata
      }
    }
  }, [user]); // user prop'u değiştiğinde yeniden çalışır

  const handleSubmit = (e) => {
    e.preventDefault();
    // Güncellenmiş kullanıcı verilerini topla
    const updatedUser = {
      id: id,
      username: username,
      email: email,
      // 'roles' state'i zaten ['ROLE_USER', 'ROLE_ADMIN'] gibi bir string dizisi olduğu için
      // direkt olarak gönderebiliriz. Bu, backend'deki UserUpdateRequest'in List<String> roles alanı ile eşleşir.
      roles: roles, 
    };
    onUpdate(updatedUser); // Parent bileşendeki (UserList) güncelleme fonksiyonunu çağır
  };

  // Popup ve Form için basit stil tanımlamaları
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
    maxWidth: '90%',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  };

  const submitButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const cancelButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
const selectStyle = {
    ...inputStyle, // Re-use input styles for consistency
    height: 'auto', // Adjust height for dropdown
    minHeight: '38px',
  };
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        <h3>Kullanıcıyı Düzenle</h3>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="userId">ID:</label>
            <input
              type="text"
              id="userId"
              value={id}
              readOnly // ID değiştirilemez olduğu için readOnly
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="username">Kullanıcı Adı:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          {/* Roller için basit bir metin alanı. Kullanıcı virgülle ayırarak roller girebilir. 
          <div style={formGroupStyle}>
            <label>Roller (virgülle ayırın, örn: ROLE_USER, ROLE_ADMIN):</label>
            <input
              type="text"
              value={roles.join(', ')} // string dizisini gösterim için virgülle birleştir
              onChange={(e) => setRoles(e.target.value.split(',').map(role => role.trim()))} // Inputtan gelen stringi, string dizisine dönüştür
              style={inputStyle}
            />
          </div>
		  */}
		      <div style={formGroupStyle}>
            <label htmlFor="roles">Roller:</label>
            <select
              id="roles"
              value={roles[0] || ''} // Tekli seçim için ilk rolü göster
              onChange={(e) => setRoles([e.target.value])} // Seçilen rolü bir dizi olarak ayarla
              style={selectStyle}
            >
              <option value="">-- Rol Seçin --</option> {/* Opsiyonel boş seçenek */}
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div style={buttonGroupStyle}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>İptal</button>
            <button type="submit" style={submitButtonStyle}>Güncelle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditForm;