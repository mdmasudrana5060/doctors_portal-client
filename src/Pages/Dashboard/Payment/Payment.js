import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { name, price, appointmentDate, slot } = booking;
    if (navigation.state === 'loading') {
        return <progress className="progress w-56" value="0" max="100"></progress>
    }
    return (
        <div>
            <h3 className='text-3xl'>Payment for {name}</h3>
            <p className='text-xl'>Please pay ${price} for your appointment on {appointmentDate} at {slot}</p>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking} />
                </Elements>

            </div>
        </div>
    );
};

export default Payment;