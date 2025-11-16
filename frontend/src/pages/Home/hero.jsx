import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hero1 from "../../assets/images/Hero/hero1.jpg";
import hero2 from "../../assets/images/Hero/hero2.jpg";
import hero3 from "../../assets/images/Hero/hero3.jpg";

function Hero() {
  const navigate = useNavigate();
  
  // Array of all slide images
  const slides = [hero1, hero2, hero3];
  
  // Track which slide is currently showing (starts at 0)
  const [current, setCurrent] = useState(0);

  // Auto-change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    // Cleanup: stop interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Function to go to a specific slide (for dots navigation)
  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
      {/* Background Slides - loops through all images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Professional service ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Strong dark overlay for excellent text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            {/* Small badge/tag above headline */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white text-sm font-medium">Available 24/7</span>
            </div>

            {/* Main Headline - Clean typography with better contrast */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Professional Services
              <span className="block mt-2">At Your Doorstep</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
              Connect with verified professionals for all your home service needs. Quality work, transparent pricing, guaranteed satisfaction.
            </p>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => navigate("/services")}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Services
              </button>
              
              <button 
                onClick={() => navigate("/about")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border-2 border-white/30 transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Trust indicators / Stats */}
            <div className="flex flex-wrap gap-6 md:gap-8 pt-6 border-t border-white/30">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs md:text-sm text-gray-200">Verified Professionals</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">10,000+</div>
                <div className="text-xs md:text-sm text-gray-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.8★</div>
                <div className="text-xs md:text-sm text-gray-200">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">15k+</div>
                <div className="text-xs md:text-sm text-gray-200">Services Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots - shows which slide is active */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;