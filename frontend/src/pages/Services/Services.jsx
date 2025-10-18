import ServiceCard from "../../components/ServiceCard";
import Footer from "../../components/Footer";

// Import images from assets
import plumber from "../../assets/images/services/plumber.jpg";
import electrician from "../../assets/images/services/electrician.jpg";
import beautician from "../../assets/images/services/beautician.jpg";
import carpenter from "../../assets/images/services/carpenter.jpg";
// import painter from "../../assets/images/services/painter.jpg";

function Services() {
  const services = [
    {
      name: "Plumber",
      description: "Expert plumbers at your doorstep.",
      img: plumber,
    },
    {
      name: "Electrician",
      description: "Professional electricians for all needs.",
      img: electrician,
    },
    {
      name: "Beautician",
      description: "Skilled beauticians for home services.",
      img: beautician,
    },
    {
      name: "Carpenter",
      description: "Expert carpenters for repairs and fittings.",
      img: carpenter,
    },
    // {
    //   name: "Painter",
    //   description: "Professional painting services with quality finish.",
    //   img: painter,
    // },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-10 lg:px-20 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Services;
