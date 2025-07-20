// src/pages/PaymentPage.jsx
import { useParams, useNavigate } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Loading from "../Loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
const { id } = useParams();
const navigate = useNavigate();

const { data: session = {}, isLoading } = useQuery({
queryKey: ["study-session", id],
queryFn: async () => {
    const res = await axios.get(`https://study-mate-server-nine.vercel.app/study-sessions/${id}`);
    return res.data;
},
});

if (isLoading) return <Loading></Loading>;

return (
<div className="max-w-xl mx-auto p-6 text-center">
    <h2 className="text-2xl font-bold mb-4 ">Pay for: {session.title}</h2>
    <p className="mb-2 text-gray-600">Registration Fee: ${session.registrationFee}</p>
payment
    <Elements stripe={stripePromise}>
    <CheckoutForm session={session} />
    </Elements>
</div>
);
};

export default PaymentPage;
