// src/pages/Services/Services.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import plumber from "../../assets/images/services/plumber.jpg";
import electrician from "../../assets/images/services/electrician.jpg";
import carpenter from "../../assets/images/services/carpenter.jpg";

/**
 * Professional Services listing page with enhanced UI/UX
 * Each card links to /service/:id (ServiceDetails page)
 */

// Service data with additional details for better presentation
const SERVICES = [
  { 
    id: "2", 
    slug: "plumbing", 
    name: "Plumbing Services", 
    image: plumber,
    description: "Expert plumbers for repairs, installations & maintenance",
    rating: "4.8",
    professionals: "150+",
    avgPrice: "₹299",
    tags: ["Emergency Available", "Licensed"]
  },
  { 
    id: "3", 
    slug: "electrician", 
    name: "Electrical Services", 
    image: electrician,
    description: "Certified electricians for all your electrical needs",
    rating: "4.9",
    professionals: "120+",
    avgPrice: "₹349",
    tags: ["24/7 Service", "Certified"]
  },
  { 
    id: "4", 
    slug: "carpentry", 
    name: "Carpentry Services", 
    image: carpenter,
    description: "Skilled carpenters for furniture & custom woodwork",
    rating: "4.7",
    professionals: "90+",
    avgPrice: "₹399",
    tags: ["Custom Work", "Experienced"]
  },
];

export default function Services() {
  // Track which card is being hovered (for enhanced effects)
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header Section with better visual hierarchy */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Services at Your Doorstep
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-8">
            Choose from our trusted professionals and get quality service delivered with excellence
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-green-100 text-sm">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-green-100 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-green-100 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Section heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Browse Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Select a service category to view professionals, pricing, and book instantly
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link 
              key={service.id} 
              to={`/service/${service.id}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                  hoveredCard === service.id ? 'transform -translate-y-2' : ''
                }`}
              >
                {/* Image with overlay and badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="font-semibold text-gray-800 text-sm">{service.rating}</span>
                  </div>

                  {/* Service name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Service stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Professionals</div>
                      <div className="font-semibold text-gray-800">{service.professionals}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Starting at</div>
                      <div className="font-bold text-green-600 text-lg">{service.avgPrice}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2">
                    View Details & Book
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose Skillify?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Professionals</h3>
              <p className="text-gray-600 text-sm">All professionals are background-verified and certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">₹</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden charges. Pay only for the service you book</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Service</h3>
              <p className="text-gray-600 text-sm">Same-day service available for most categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}