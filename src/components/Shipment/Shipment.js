import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const loggedInUser = useContext(UserContext)[0];

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