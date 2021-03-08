import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p>by: {seller}</p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock -Order soon</small></p>
                {props.showAddToCart && 
                    <button onClick={()=>props.handleAddToCart(props.product)} className="product-cart-btn">
                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;