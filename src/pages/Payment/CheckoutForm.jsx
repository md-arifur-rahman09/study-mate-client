import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Get payment intent from backend
  useEffect(() => {
    if (session.registrationFee > 0) {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          amount: session.registrationFee,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [session]);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) {
      Swal.fire("Payment Failed", error.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const bookingData = {
        sessionId: session._id,
        sessionTitle: session.title,
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        registrationFee: session.registrationFee,
        status: "booked",
        paymentStatus: "paid",
        sessionStart: session.classStart || null,
        sessionEnd: session.classEnd || null,
        bookingTime: new Date().toISOString(),
      };

      const paymentData = {
        sessionId: session._id,
        sessionTitle: session.title,
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        registrationFee: session.registrationFee,
        transactionId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method_types?.[0] || "card",
        currency: paymentIntent.currency,
        paidAmount: paymentIntent.amount / 100,
        sessionStart: session.classStart || null,
        sessionEnd: session.classEnd || null,
        paymentTime: new Date().toISOString(),
      };

      try {
        const res = await axios.post("http://localhost:5000/booked-sessions", bookingData);
        if (res.data.insertedId || res.data.success) {
          await axios.post("http://localhost:5000/payments", paymentData);
          Swal.fire("Payment Successful", "Session booked successfully", "success");
          navigate("/dashboard/my-booked-sessions");
        }
      } catch {
        Swal.fire("Booking Error", "Payment succeeded but booking failed", "error");
      }
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Secure Payment
        </h2>

        <div className="border p-4 rounded-md bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
        >
          {processing
            ? "Processing..."
            : `Pay $${session.registrationFee || 0}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
