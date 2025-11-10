import React, { useEffect, useState } from "react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Booking History
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">
            No bookings found. Try booking a service!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{booking.serviceName}</td>
                    <td className="py-3 px-4">{booking.date}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      ₹{booking.price}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
