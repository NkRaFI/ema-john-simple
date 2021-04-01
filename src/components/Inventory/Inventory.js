import React from 'react';

const Inventory = () => {
    document.title = 'Ema John | Inventory';

    const handleAddProduct = () => {
        const product = {}
        fetch('https://pumpkin-tart-01673.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <form action="">
                <p><span>Product Name</span><input type="text"/></p>
                <p><span>Product Price</span><input type="text"/></p>
                <p><span>Product Quantity</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;