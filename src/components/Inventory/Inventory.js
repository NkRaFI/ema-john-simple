import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    document.title = 'Ema John | Inventory';

    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;