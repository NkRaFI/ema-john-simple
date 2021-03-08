import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, img, key, price} = props.product;
    return (
        <div className="review-item">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="review-item-name">{name}</h4>
                <h4>Quantity: {quantity}</h4>
                <p> <small>Price: {price}</small> </p>
                <br/>
                <button onClick={() => props.removeProduct(key)} className="cart-btn">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;