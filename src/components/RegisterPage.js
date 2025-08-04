import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/actions/authActions';
// import '../styles/App.css'; // Global stil index.js'te import edildiği için burada gerekmez

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage('');
        setSuccessful(false);

        dispatch(register(username, email, password, ['user'])) // Varsayılan olarak 'user' rolü verilebilir
            .then((msg) => {
                setMessage(msg);
                setSuccessful(true);
                // navigate('/login'); // Başarılı kayıttan sonra giriş sayfasına yönlendir
            })
            .catch((error) => {
                setMessage(error || 'Kayıt başarısız. Lütfen tekrar deneyin.');
                setSuccessful(false);
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Kayıt Ol</h2>
                <form onSubmit={handleRegister}>
                    {message && (
                        <div className={successful ? "success-message" : "error-message"}>
                            {message}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-posta:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Şifre:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">Kayıt Ol</button>
                </form>
                <Link to="/login" className="auth-link">Zaten hesabınız var mı? Giriş Yapın</Link>
            </div>
        </div>
    );
}

export default RegisterPage;