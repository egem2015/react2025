import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { fetchContent } from '../redux/actions/contentActions';
import AddUserPage from './AddUserPage';
// import '../styles/App.css'; // Global stil index.js'te import edildiği için burada gerekmez

function Menu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const { isLoggedIn, user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Çıkış yaptıktan sonra giriş sayfasına yönlendir
        window.location.reload(); // Sayfayı yenileyerek Redux state'ini sıfırla
    };
    const isAdmin = isLoggedIn && user && Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN');


    const str=JSON.stringify(user);
    
    console.log("isAdmin: " + str); // Şimdi her zaman true/false dönmeli


    const handleContentClick = (pageName) => {
        // Sadece giriş yapıldıysa içerik çekmeyi dene
        if (isLoggedIn) {
            dispatch(fetchContent(pageName));
            navigate('/'); // İçerik alanına geri dön (varsa)
        } else {
            alert("İçeriği görmek için lütfen giriş yapın.");
            navigate('/login');
        }
    };

    return (
        <nav className="menu">
            <ul>
                <li className="dropdown">
                    <a href="#" className="dropbtn">MENU</a>
                    <div className="dropdown-content">
                        {isLoggedIn ? (
                            <>
                                <Link to="/" onClick={() => handleContentClick('home')}>Ana Sayfa</Link>
                                <Link to="/" onClick={() => handleContentClick('about')}>Hakkımızda</Link>
                                <Link to="/" onClick={() => handleContentClick('contact')}>İletişim</Link>
                                
                                <Link to="#" onClick={handleLogout}>Çıkış Yap</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Giriş Yap</Link>
                                <Link to="/register">Kayıt Ol</Link>
                            </>
                        )}
                    </div>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropbtn">Kullanıcılar</a>
                    <div className="dropdown-content">
 
                            <Link to="/admin/users">Kullanıcı Listesi</Link>
                            <Link to="/admin/users/add">Kullanıcı Ekle</Link> {/* YENİ KULLANICI EKLE LİNKİ */}
                            {/* İleride başka admin linkleri de eklenebilir */}
                    </div>
                   
              
                   
                </li>
            </ul>
        </nav>
    );
}

export default Menu;