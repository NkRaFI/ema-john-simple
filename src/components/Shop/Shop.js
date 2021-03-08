import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const fakeData10 = fakeData.slice(0, 10);

    const [products, setProducts] = useState([]);
    useEffect( ()=> setProducts(fakeData10), []);

    const [cart, setCart] = useState([]);

    useEffect( ()=> {
        const savedCart = getDatabaseCart();
        const existingProductKeys = Object.keys(savedCart);
        const previousCart = existingProductKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(previousCart);
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