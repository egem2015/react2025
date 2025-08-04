import React from 'react';
import '../styles/App.css';

function Banner({ children }) { // children prop'unu kabul edin
    return (
        <header className="banner">
            {children} {/* children prop'u buraya render edilecek (yani Menu) */}
        </header>
    );
}

export default Banner;