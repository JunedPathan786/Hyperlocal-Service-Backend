// src/pages/ServiceDetails/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

/**
 * Professional Service Details Page with enhanced UI/UX
 * Shows service details and available sub-services with pricing
 */

const SERVICES_DB = [
  {
    id: "1",
    slug: "salon",
    name: "Salon Services",
    description: "Professional salon services at your doorstep — haircuts, facials, grooming and more.",
    banner: "/assets/images/services/salon.jpg",
    rating: "4.8",
    reviews: "2,340",
    professionals: "80+",
    items: [
      { 
        id: "salon-1", 
        name: "Haircut - Men", 
        price: 299, 
        duration: "30 mins",
        description: "Professional haircut with styling",
        popular: true
      },
      { 
        id: "salon-2", 
        name: "Haircut - Women", 
        price: 499, 
        duration: "45 mins",
        description: "Haircut with wash and blow-dry"
      },
      { 
        id: "salon-3", 
        name: "Facial & Cleanup", 
        price: 699, 
        duration: "60 mins",
        description: "Deep cleansing facial with skin treatment"
      },
    ],
  },
  {
    id: "2",
    slug: "plumbing",
    name: "Plumbing Services",
    description: "Expert plumbing solutions for all household repairs and installations.",
    banner: "/assets/images/services/plumber.jpg",
    rating: "4.8",
    reviews: "1,890",
    professionals: "150+",
    items: [
      { 
        id: "plumb-1", 
        name: "Tap Repair", 
        price: 249, 
        duration: "30 mins",
        description: "Fix leaking or damaged taps",
        popular: true
      },
      { 
        id: "plumb-2", 
        name: "Leak Fix", 
        price: 399, 
        duration: "45 mins",
        description: "Detect and repair water leaks"
      },
      { 
        id: "plumb-3", 
        name: "Toilet Installation", 
        price: 799, 
        duration: "90 mins",
        description: "Complete toilet fitting and setup"
      },
    ],
  },
  {
    id: "3",
    slug: "electrician",
    name: "Electrical Services",
    description: "Certified electricians for wiring, fixtures, and all electrical repairs.",
    banner: "/assets/images/services/electrician.jpg",
    rating: "4.9",
    reviews: "2,100",
    professionals: "120+",
    items: [
      { 
        id: "elec-1", 
        name: "Switch/Socket Fix", 
        price: 199, 
        duration: "20 mins",
        description: "Repair or replace switches and sockets",
        popular: true
      },
      { 
        id: "elec-2", 
        name: "Full Wiring Check", 
        price: 999, 
        duration: "90 mins",
        description: "Complete electrical safety inspection"
      },
      { 
        id: "elec-3", 
        name: "Fan Installation", 
        price: 349, 
        duration: "40 mins",
        description: "Install ceiling or wall-mounted fans"
      },
    ],
  },
  {
    id: "4",
    slug: "carpentry",
    name: "Carpentry Services",
    description: "Skilled carpenters for furniture repair, custom woodwork, and installations.",
    banner: "/assets/images/services/carpenter.jpg",
    rating: "4.7",
    reviews: "1,560",
    professionals: "90+",
    items: [
      { 
        id: "carp-1", 
        name: "Chair Repair", 
        price: 399, 
        duration: "30 mins",
        description: "Fix broken or wobbly chairs"
      },
      { 
        id: "carp-2", 
        name: "Door Fix", 
        price: 599, 
        duration: "45 mins",
        description: "Repair hinges, locks, and alignment",
        popular: true
      },
      { 
        id: "carp-3", 
        name: "Shelf Installation", 
        price: 699, 
        duration: "60 mins",
        description: "Mount and install custom shelving"
      },
    ],
  },
];

export default function ServiceDetails() {
  const { id } = useParams(); // Get service ID from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [service, setService] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set()); // Track which items are added

  // Load service data when component mounts or ID changes
  useEffect(() => {
    const found = SERVICES_DB.find((s) => s.id === id || String(s.id) === String(id));
    setService(found || null);
  }, [id]);

  // Show loading/error state if service not found
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-500 mb-6">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            ← Back to All Services
          </button>
        </div>
      </div>
    );
  }

  // Add item to cart and track it
  const handleAdd = (item) => {
    addToCart({
      ...item,
      serviceId: service.id,
      serviceName: service.name,
    });
    
    // Mark this item as added (for visual feedback)
    setAddedItems(prev => new Set([...prev, item.id]));
    
    // Remove the "added" state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section with Service Info */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/services")}
            className="text-green-100 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors"
          >
            ← Back to Services
          </button>

          <div className="md:flex md:gap-12 md:items-center">
            {/* Service Banner Image */}
            <div className="md:w-2/5">
              <img
                src={service.banner}
                alt={service.name}
                className="w-full h-72 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Service Info */}
            <div className="mt-8 md:mt-0 md:flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-green-50 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Service Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300 text-2xl">★</span>
                  <span className="text-xl font-bold">{service.rating}</span>
                  <span className="text-green-100">({service.reviews} reviews)</span>
                </div>
                <div className="border-l border-green-300 pl-6">
                  <span className="text-green-100">Available Professionals</span>
                  <div className="text-xl font-bold">{service.professionals}</div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  ✓ Verified Professionals
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  ✓ Same Day Service
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  ✓ Money Back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Services Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Choose Your Service
          </h2>
          <p className="text-gray-600 text-lg">
            Select from our professional services and add to cart to book
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.items.map((item) => {
            const isAdded = addedItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-green-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⏱</span>
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Card Footer with Price and Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Starting at</div>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{item.price}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                          isAdded
                            ? "bg-green-600 text-white"
                            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg transform hover:scale-105"
                        }`}
                      >
                        {isAdded ? "✓ Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Ready to Book?</h3>
          <p className="text-green-50 mb-6">
            Review your selected services and proceed to checkout
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-green-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Go to Cart
            <span>→</span>
          </button>
        </div>

        {/* Why Choose This Service Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Our {service.name}?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🔧</span>
              </div>
              <h4 className="font-semibold mb-2">Expert Professionals</h4>
              <p className="text-sm text-gray-600">Trained and certified experts</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Quick Service</h4>
              <p className="text-sm text-gray-600">Same-day service available</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold mb-2">Best Prices</h4>
              <p className="text-sm text-gray-600">Competitive and transparent</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-semibold mb-2">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">100% satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}