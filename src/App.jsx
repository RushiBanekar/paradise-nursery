import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
    const [page, setPage] = useState('home');

    if (page === 'plants') {
        return <ProductList onHome={() => setPage('home')} onCart={() => setPage('cart')} />;
    }

    if (page === 'cart') {
        return (
            <CartItem
                onHome={() => setPage('home')}
                onPlants={() => setPage('plants')}
            />
        );
    }

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>Paradise Nursery</h1>
                <p className="tagline">Where Green Meets Serenity</p>
                <button className="get-started-btn" onClick={() => setPage('plants')}>
                    Get Started
                </button>
            </div>
            <div className="about-container">
                <AboutUs />
            </div>
        </div>
    );
}

export default App;