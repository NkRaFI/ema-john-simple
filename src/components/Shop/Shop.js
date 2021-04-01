import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    document.title = 'Ema John | Shop';

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://pumpkin-tart-01673.herokuapp.com/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    const [cart, setCart] = useState([]);

    useEffect( ()=> {
        const savedCart = getDatabaseCart();
        const existingProductKeys = Object.keys(savedCart);
        fetch('https://pumpkin-tart-01673.herokuapp.com/productsByKeys', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(existingProductKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const handleAddToCart = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = product.quantity + 1;
            product.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.length === 0 && <p>Loading...</p>
                }
                {
                    products.map(pd => <Product product={pd} key={pd.key} handleAddToCart={handleAddToCart} showAddToCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-btn">Review Your Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;