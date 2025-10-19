import { useState, useEffect } from "react";
import hero1 from "../../assets/images/Hero/hero1.jpg";
import hero2 from "../../assets/images/Hero/hero2.jpg";
import hero3 from "../../assets/images/Hero/hero3.jpg";

function Hero() {
  const slides = [hero1, hero2, hero3];
  const [current, setCurrent] = useState(0);

  // Change slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-96 md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Hero Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Hire Local Professionals Easily
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Plumbers, Electricians, Beauticians & more at your doorstep
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;
