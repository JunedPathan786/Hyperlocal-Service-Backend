import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart(); // Access clearCart safely

  useEffect(() => {
    // Clear the cart when success page loads
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full transform transition-all duration-500 hover:scale-[1.02]">
        <div className="text-green-500 text-6xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for choosing{" "}
          <span className="font-semibold text-blue-600">Skillify</span>. <br />
          Your service booking has been confirmed and our provider will reach out
          to you shortly.
        </p>

        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Go to Homepage 
          {/* ek ye mathakut hai jo link kaam nahi kar rahi aur mera dimag bhi nahi kaam kar raha
          bhai juned ab tu dekh lena ye wala thoda sir dard hoga per aaj ka quota mera khatam. All the best! */}
        </Link>


      </div>
    </div>
  );
};

export default CheckoutSuccess;
