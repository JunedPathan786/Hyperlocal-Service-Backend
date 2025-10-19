import React from "react";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions? Send us a message and we'll respond soon.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 300 1234567"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 hover:border-green-400 transition resize-none"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
