import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { login } from '../redux/actions/authActions';
// import '../styles/App.css'; // Global stil index.js'te import edildiği için burada gerekmez

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
	const [loading2, setLoading2] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth); // Redux state'inden isLoggedIn'i al
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Kullanıcı zaten giriş yaptıysa ana sayfaya yönlendir
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage(''); // Önceki mesajları temizle
        setLoading2(true);
        dispatch(login(username, password))
            .then(() => {


                console.log("basariliiiiiiiiiiiiiiiiiiii....");
                navigate('api/content/deneme'); // Başarılı girişte ana sayfaya yönlendir
               
            })
            .catch((error) => {
				setLoading2(false);
                setMessage(error || 'Giriş başarısız24343345. Lütfen tekrar deneyin.');
            });
    };
	

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Giriş Yap</h2>
                <form onSubmit={handleLogin}>
                    {message && <div className="error-message">{message}</div>}
					{loading2 && <div >Giriş yapılıyor...</div>}
                    <div className="form-group my-centered-group">
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group my-centered-group">
                        <label htmlFor="password">Şifre:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Giriş Yap</button>
                </form>
                <Link to="/register" className="auth-link">Hesabınız yok mu? Kayıt Olun</Link>
            </div>
        </div>
    );
}

export default LoginPage;
