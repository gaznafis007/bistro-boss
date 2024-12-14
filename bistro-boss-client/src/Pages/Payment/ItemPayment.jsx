import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import useCart from '../../hooks/useCart';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const ItemPayment = () => {
    const [carts, refetch] = useCart();
    const totalPrice = carts.reduce((sum, cart) => sum + parseFloat(cart?.price), 0)
    const axiosSecure = useAxios();
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() =>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', {amount: parseInt(totalPrice*100)})
        .then(res => setClientSecret(res.data?.clientSecret))
        }
    },[totalPrice, axiosSecure])
  return (
    <div className="p-8 w-full bg-slate-100 flex flex-col justify-center items-center">
      <h2 className="text-center text-3xl uppercase">payment: $ {totalPrice}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} refetch={refetch}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default ItemPayment;
