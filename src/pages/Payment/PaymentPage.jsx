// src/pages/PaymentPage.jsx
import { useParams, useNavigate } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
const { id } = useParams();
const navigate = useNavigate();

const { data: session = {}, isLoading } = useQuery({
queryKey: ["study-session", id],
queryFn: async () => {
    const res = await axios.get(`http://localhost:5000/study-sessions/${id}`);
    return res.data;
},
});

if (isLoading) return <p className="text-center py-10">Loading...</p>;

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
