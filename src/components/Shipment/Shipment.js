import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const loggedInUser = useContext(UserContext)[0];
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderInfo = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}
        fetch('https://pumpkin-tart-01673.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
                alert('order placed successfully')
            }
        })
    };

    return (
        <div className="shipment">
            <form onSubmit={handleSubmit(onSubmit)}>

                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
                {errors.name && <span className="error">This field is required</span>}
                
                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
                {errors.email && <span className="error">This field is required</span>}
                
                <input name="address" ref={register({ required: true })} placeholder="Your Address"/>
                {errors.address && <span className="error">This field is required</span>}
                
                <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number"/>
                {errors.phone && <span className="error">This field is required</span>}

                <input type="submit" defaultValue="submit" />
            </form>
        </div>
    );
};

export default Shipment;