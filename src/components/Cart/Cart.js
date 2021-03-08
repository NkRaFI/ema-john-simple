import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart
    //total price using reduce method
    const total = cart.reduce((total, pd) =>total+pd.price*pd.quantity, 0);
    //shipping cost depending on total price
    let shippingCost = 0;
    if(total > 35){
        shippingCost = 0;
    }
    else if(total > 15){
        shippingCost = 4.00;
    }
    else if(total > 0){
        shippingCost = 12;
    }
    //vat tax calculation 10% which is 0.1
    const vat = total * 0.1;
    //function for fixed the number after decimal point and cover it to number again
    const fixedAndCoverToNum = (num) => {
        return Number(num.toFixed(2));
    }
    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {fixedAndCoverToNum(total)}</p>
            <p>Shipping Cost: {fixedAndCoverToNum(shippingCost)}</p>
            <p>Vat + Tax: {fixedAndCoverToNum(vat)}</p>
            <p>Total Price: {(total + shippingCost + vat).toFixed(2)}</p>
            {props.children}
        </div>
    );
};

export default Cart;