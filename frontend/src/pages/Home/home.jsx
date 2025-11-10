import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../../pages/Home/hero";
import plumber from "../../assets/images/services/plumber.jpg";
import electrician from "../../assets/images/services/electrician.jpg";
import beautician from "../../assets/images/services/beautician.jpg";
import carpenter from "../../assets/images/services/carpenter.jpg";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  // Service data with IDs for navigation
  const services = [
    { 
      id: "2",
      img: plumber, 
      name: "Plumbing", 
      desc: "Expert plumbers for repairs and installations",
      professionals: "150+"
    },
    { 
      id: "3",
      img: electrician, 
      name: "Electrical", 
      desc: "Certified electricians for all your needs",
      professionals: "120+"
    },
    { 
      id: "1",
      img: beautician, 
      name: "Beauty & Salon", 
      desc: "Professional beauty services at home",
      professionals: "80+"
    },
    { 
      id: "4",
      img: carpenter, 
      name: "Carpentry", 
      desc: "Skilled carpenters for furniture work",
      professionals: "90+"
    },
  ];

  const howItWorksSteps = [
    { 
      icon: "🔍", 
      title: "Browse Services", 
      text: "Find the right professional from our curated list of verified experts" 
    },
    { 
      icon: "📋", 
      title: "Book Instantly", 
      text: "Select your service, choose a time slot that works for you" 
    },
    { 
      icon: "👨‍🔧", 
      title: "Expert Arrives", 
      text: "Professional arrives at your doorstep on time, ready to work" 
    },
    { 
      icon: "✓", 
      title: "Complete & Pay", 
      text: "Service completed to your satisfaction. Pay securely online" 
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Popular Services Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our most requested services delivered by trusted professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                onClick={() => navigate(`/service/${service.id}`)}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {service.professionals} Professionals
                    </span>
                    <span className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div data-aos="fade-up" className="text-center mt-12">
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Book professional services in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="relative"
              >
                {/* Connector Line - Hidden on mobile, shown on lg+ */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
                )}

                <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full font-bold text-lg mb-6">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Skillify?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We connect you with verified professionals for quality service you can trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Verified Professionals",
                desc: "All professionals are background-verified, certified, and trained"
              },
              {
                icon: "⚡",
                title: "Fast & Reliable",
                desc: "Same-day service available with on-time arrival guarantee"
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                desc: "No hidden charges. See the full cost upfront before booking"
              },
            ].map((feature, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Verified Professionals" },
              { number: "10,000+", label: "Happy Customers" },
              { number: "15,000+", label: "Services Completed" },
              { number: "4.8★", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Browse our services and book a professional today. Quality service delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-lg transition-colors shadow-sm hover:shadow-md"
            >
              Browse Services
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-lg font-semibold text-lg transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;