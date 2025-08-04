// src/components/UserList.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from './user.service';
import UserEditForm from './UserEditForm'; // Kullanıcı düzenleme formu

const UserList = () => {
  const { user: currentUser } = useSelector(state => state.auth); // Redux'tan current user'ı al
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null); // Düzenlenen kullanıcı
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal açık mı?

  // Sayfalama state'leri
  const [currentPage, setCurrentPage] = useState(0); // Backend 0'dan başlıyor
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // Sayfa başına 5 kayıt

  // Kullanıcı listesini getirme fonksiyonu
  const retrieveUsers = async (page) => {
    setLoading(true);
    setMessage('');
    try {
      // Sayfa ve boyut parametrelerini gönder
      const response = await userService.getAllUsers(page, pageSize);
      setUsers(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage("Kullanıcılar alınırken hata oluştu: " + resMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    // ADMIN değilse yönlendir
    if (!currentUser || !currentUser.roles || !currentUser.roles.includes('ROLE_ADMIN')) {
      navigate('/'); // Ana sayfaya veya yetkisiz sayfaya yönlendir
      return;
    }
    retrieveUsers(currentPage); // İlk yüklemede mevcut sayfayı getir
  }, [currentPage, currentUser, navigate]); // currentPage değiştiğinde yeniden veri çek

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };
  
    // --- NEW: Function to handle user update from UserEditForm ---
  const handleUpdateUser = async (updatedUser) => {
    setMessage(''); // Clear previous messages
    try {
      await userService.updateUser(updatedUser.id, updatedUser);
      setMessage("Kullanıcı başarıyla güncellendi!");
      handleCloseEditModal(); // Close the modal and refresh the list
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage("Kullanıcı güncellenirken hata oluştu: " + resMessage);
      // Don't close modal on error, so user can fix it
    }
  };
  // --- END NEW ---


  const handleDelete = async (userId) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      setMessage('');
      try {
        await userService.deleteUser(userId);
        setMessage("Kullanıcı başarıyla silindi!");
        retrieveUsers(currentPage); // Güncel sayfayı yeniden yükle
      } catch (error) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage("Kullanıcı silinirken hata oluştu: " + resMessage);
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    retrieveUsers(currentPage); // Modal kapandığında listeyi yenile
  };

  // Sayfa numaraları için butonları render eden fonksiyon
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i + 1} {/* Sayfa numaralarını 1'den başlatmak için +1 */}
        </button>
      );
    }
    return buttons;
  };

  if (loading) {
    return <div className="user-list-container"><p>Kullanıcılar yükleniyor...</p></div>;
  }

  if (message) {
    return <div className="user-list-container"><p className="message error">{message}</p></div>;
  }

  return (
    <div className="user-list-container">
      <h2>Kullanıcı Listesi</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>E-posta</th>
            <th>Roller</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles ? user.roles.join(', ') : 'N/A'}</td>
          <td className="user-actions">
          {/* Sadece kullanıcının username'i 'admin' değilse butonları göster */}
          {user.username !== 'admin' && (
            <>
              <button onClick={() => handleEdit(user)}>Düzenle</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Sil</button>
            </>
          )}
        </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Kayıtlı kullanıcı bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Sayfalama Butonları */}
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="pagination-button"
        >
          Önceki
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
        >
          Sonraki
        </button>
      </div>

      {/* UserEditForm modalı */}
      {isEditModalOpen && (
        <UserEditForm
          user={editingUser}
		  onUpdate={handleUpdateUser} 
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default UserList;