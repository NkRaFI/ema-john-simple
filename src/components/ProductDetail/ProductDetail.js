import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    document.title = 'Ema John | Detail';
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`https://pumpkin-tart-01673.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Product detail</h1>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;