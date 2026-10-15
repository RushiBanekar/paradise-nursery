import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onHome, onPlants }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

    const handleIncrement = (item) =>
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleDelete = (item) => dispatch(removeItem(item.name));

    const handleCheckout = () => alert('Coming Soon');

    return (
        <div>
            <div className="navbar">
                <div className="navbar-brand" onClick={onHome}>Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }}>Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onPlants(); }}>Plants</a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="cart-link">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">{totalQuantity}</span>
                        Cart
                    </a>
                </div>
            </div>

            <div className="cart-container">
                <h2>Total Plants in Cart: {totalQuantity}</h2>
                <h2>Total Cart Amount: ${totalAmount}</h2>

                {cartItems.length === 0 && <p>Your cart is empty.</p>}

                {cartItems.map((item) => (
                    <div className="cart-item" key={item.name}>
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Unit Price: ${item.cost}</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <p>Total: ${item.cost * item.quantity}</p>
                            <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                    </div>
                ))}

                <div className="cart-actions">
                    <button className="continue-btn" onClick={onPlants}>Continue Shopping</button>
                    <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;