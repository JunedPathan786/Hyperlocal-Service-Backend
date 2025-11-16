import React from "react";

const providers = [
  {
    id: 1,
    name: "Dr. Neha Sharma",
    specialty: "Cardiologist",
    rating: 4.8,
    experience: "10 Years",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Dr. Amit Patel",
    specialty: "Dentist",
    rating: 4.6,
    experience: "8 Years",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Dr. Kavita Nair",
    specialty: "Dermatologist",
    rating: 4.9,
    experience: "12 Years",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
];

const Providers = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Expert Providers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition duration-300"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold text-center mt-4 text-gray-700">
              {provider.name}
            </h3>
            <p className="text-center text-gray-500">{provider.specialty}</p>
            <p className="text-center text-gray-500">
              ⭐ {provider.rating} | {provider.experience}
            </p>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
