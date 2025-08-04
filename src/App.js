import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/actions/authActions'; // logout action'ı import edin

import UserList from './components/UserList';
import Banner from './components/Banner';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ContentArea from './components/ContentArea';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './helpers/ProtectedRoute'; // ProtectedRoute'u import edin

import './styles/App.css';
import AddUserPage from './components/AddUserPage';

function App() {
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Uygulama yüklendiğinde veya isLoggedIn değiştiğinde gerekli kontrolleri yapabilirsiniz
    useEffect(() => {
        // Eğer token süresi dolduysa ve kullanıcı yine de giriş yapmaya çalışıyorsa
        // veya manuel olarak tokenı sildiyse, logout işlemini tetikleyebilirsiniz.
        // Bu, Axios interceptor'da da yapılabilir.
    }, [isLoggedIn, dispatch]);

    

 return (
        <Router>
            <div className="app-container">
                <Banner>
                    {isLoggedIn && <Menu />} {/* Menu'yu Banner'ın çocuk elemanı olarak gönderdik */}
                </Banner>
                <Routes>
                    {/* Public Rotalar (Giriş yapmadan erişilebilir) */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<ContentArea />} />
                        <Route path="/about" element={<ContentArea />} />
                        <Route path="/contact" element={<ContentArea />} />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/admin/users/add" element={<AddUserPage />} />
                    </Route>
                    {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
  }

export default App;