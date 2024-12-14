/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({clientSecret, refetch}) => {
    const axiosSecure = useAxios();
    const {user} = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const cardElement = elements.getElement(CardElement)
        try{
            const {paymentIntent, error} = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method:{
                        card: cardElement,
                        billing_details:{
                            name: user?.displayName,
                            email: user?.email
                        }
                    }
                }
            );
            if(error){
                setPaymentError(error?.message);
            }
            else if(paymentIntent.status === 'succeeded'){
                const paymentInfo = {
                    trxId: paymentIntent?.id,
                    name: user?.displayName,
                    email: user?.email,
                    amount: paymentIntent?.amount/100,
                    category: 'food order',
                }
                axiosSecure.post(`/payments?email=${user?.email}`, paymentInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.payment.acknowledged){
                        refetch();
                        setPaymentSuccess(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/paymentHistory')
                    }
                })
            }
        }
        catch(error){
            setPaymentError(error)
        }
    }
    return (
        <form className="w-full mt-4 mx-4" onSubmit={handleSubmit}>
           <CardElement/>
           <button className=" mt-6 block capitalize w-48 btn btn-primary mx-auto" disabled={!stripe}>submit</button>
           {
            paymentError && <p className="text-red-500 text-center">{paymentError}</p>
           }
           {
            paymentSuccess && <p className="text-green-500 text-center">payment successful</p>
           }
        </form>
    );
};

export default CheckoutForm;