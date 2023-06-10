import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const { price, email, patientName, _id } = booking;

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-ten-sand.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,

                        email: email,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            };
            fetch('https://doctors-portal-server-ten-sand.vercel.app/payments', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrates! Your payment is done successfully');
                        setTransactionId(paymentIntent.id);

                    }

                })


        }
        console.log('paymentIntent', paymentIntent);
        setProcessing(false);


    }




    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-primary mt-4' type="submit" disabled={!stripe && !clientSecret & processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green'>{success}</p>
                    <p>Your transactionid : <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>

    );
};

export default CheckOutForm;