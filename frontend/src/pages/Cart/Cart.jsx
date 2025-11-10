// src/pages/Cart/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Show empty cart state
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl text-gray-300">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">
            Add services to your cart to get started with booking
          </p>
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/services")}
            className="text-gray-600 hover:text-gray-800 text-sm mb-4 flex items-center gap-2 transition-colors"
          >
            ← Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Item Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.serviceName}
                    </p>
                    {item.duration && (
                      <div className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <span>⏱</span>
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center gap-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-600 font-medium">Qty:</label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                          className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value)))}
                          className="w-16 p-2 text-center border-x border-gray-300 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-xl font-bold text-gray-900">
                        ₹{item.price * item.qty}
                      </div>
                      {item.qty > 1 && (
                        <div className="text-xs text-gray-500">
                          ₹{item.price} each
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button - Only on mobile/tablet */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your cart?")) {
                  clearCart();
                }
              }}
              className="lg:hidden w-full py-3 text-gray-600 hover:text-red-500 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary - Takes 1 column (sticky on desktop) */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Charges</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST)</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">₹{total}</div>
                  <div className="text-xs text-gray-500 mt-1">inclusive of all taxes</div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-sm hover:shadow-md mb-3"
              >
                Proceed to Checkout
              </button>

              {/* Clear Cart - Desktop only */}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your cart?")) {
                    clearCart();
                  }
                }}
                className="hidden lg:block w-full py-3 text-gray-600 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}