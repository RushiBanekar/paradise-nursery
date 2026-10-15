import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (n) =>
    `https://placehold.co/150x150/2e7d32/ffffff?text=${encodeURIComponent(n)}`;

const plantsArray = [
    {
        category: 'Air Purifying Plants',
        plants: [
            { name: 'Snake Plant', cost: 15 },
            { name: 'Spider Plant', cost: 12 },
            { name: 'Peace Lily', cost: 18 },
            { name: 'Boston Fern', cost: 14 },
            { name: 'Rubber Plant', cost: 20 },
            { name: 'Areca Palm', cost: 22 },
        ],
    },
    {
        category: 'Aromatic Plants',
        plants: [
            { name: 'Lavender', cost: 16 },
            { name: 'Jasmine', cost: 18 },
            { name: 'Rosemary', cost: 12 },
            { name: 'Mint', cost: 8 },
            { name: 'Lemon Balm', cost: 10 },
            { name: 'Basil', cost: 9 },
        ],
    },
    {
        category: 'Low Light Plants',
        plants: [
            { name: 'ZZ Plant', cost: 25 },
            { name: 'Pothos', cost: 10 },
            { name: 'Cast Iron Plant', cost: 24 },
            { name: 'Chinese Evergreen', cost: 19 },
            { name: 'Parlor Palm', cost: 21 },
            { name: 'Dracaena', cost: 23 },
        ],
    },
];

function ProductList({ onHome, onCart }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const isInCart = (name) => cartItems.some((item) => item.name === name);

    const handleAddToCart = (plant) => {
        dispatch(addItem({ name: plant.name, image: img(plant.name), cost: plant.cost }));
    };

    return (
        <div>
            <div className="navbar">
                <div className="navbar-brand" onClick={onHome}>Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }}>Home</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Plants</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onCart(); }} className="cart-link">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">{totalQuantity}</span>
                        Cart
                    </a>
                </div>
            </div>

            <div className="product-grid">
                {plantsArray.map((group) => (
                    <div key={group.category}>
                        <h2 className="category-title">{group.category}</h2>
                        <div className="plant-row">
                            {group.plants.map((plant) => (
                                <div className="product-card" key={plant.name}>
                                    <img src={img(plant.name)} alt={plant.name} className="product-image" />
                                    <h3>{plant.name}</h3>
                                    <p className="price">${plant.cost}</p>
                                    <button
                                        className="add-btn"
                                        disabled={isInCart(plant.name)}
                                        onClick={() => handleAddToCart(plant)}
                                    >
                                        {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;