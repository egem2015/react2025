import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent } from '../redux/actions/contentActions';
// import '../styles/App.css'; // Global stil index.js'te import edildiği için burada gerekmez

function ContentArea() {
    const dispatch = useDispatch();
    const { currentContent, error } = useSelector(state => state.content);
    const { isLoggedIn } = useSelector(state => state.auth);

    // Bileşen yüklendiğinde veya isLoggedIn durumu değiştiğinde varsayılan içeriği yükle
    useEffect(() => {
        if (isLoggedIn && currentContent === 'Lütfen giriş yapın veya bir içerik seçin.') {
            // Kullanıcı girişi sonrası varsayılan olarak ana sayfa içeriğini çek
            dispatch(fetchContent('home'));
        }
    }, [isLoggedIn, currentContent, dispatch]);


    return (
        <main className="content-area">
            <h1>İÇERİK</h1>
            {error && <p className="error-message">{error}</p>}
            <p>{currentContent}</p>
        </main>
    );
}

export default ContentArea;