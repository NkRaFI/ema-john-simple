import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    document.title = 'Ema John | Review';
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    const handleProceedToCheckout = () => {
        history.push('/shipment')
        // processOrder();
        // setCart([]);
        // setOrderPlaced(true)
    }
    const orderPlacedImg = <img src={happyImg} alt=""/>

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        
        fetch('https://pumpkin-tart-01673.herokuapp.com/productsByKeys', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
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
                    cart.length === 0 && <p>Loading...</p>
                }
                {
                    cart.map( pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
                }
                {
                    orderPlaced && orderPlacedImg
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button onClick={handleProceedToCheckout} className="cart-btn">Proceed to Checkout </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;