function ServiceCard({ name, description, img }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-black transition-all duration-300 shadow-sm hover:shadow-lg">
      <img
        src={img}
        alt={name}
        className="mx-auto mb-4 w-60 h-60 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
