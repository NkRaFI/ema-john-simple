import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        processOrder();
        setCart([]);
        setOrderPlaced(true)
    }
    const orderPlacedImg = <img src={happyImg} alt=""/>

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(cartProduct);
    },[])
    // const cartItems = cart.reduce( (sum, pd) => sum + pd.quantity, 0);
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
        <div className="review-page">
            <div className="review-page-products">
                {
                    cart.map( pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
                }
                {
                    orderPlaced && orderPlacedImg
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="cart-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;