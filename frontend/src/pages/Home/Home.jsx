import Footer from "../../components/Footer";
import Hero from "../../pages/Home/Hero";
import plumber from "../../assets/images/services/plumber.jpg";
import electrician from "../../assets/images/services/electrician.jpg";
import beautician from "../../assets/images/services/beautician.jpg";
import carpenter from "../../assets/images/services/carpenter.jpg";
// import painter from "../../assets/images/services/painter.jpg";

function Home() {
    return (
        <>

            {/* Hero section */}
            <Hero />



            {/* Popular Services Section */}
            <section className="py-20 px-10 bg-gray-50">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Popular Services
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Service Card 1 */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
                        <img
                            src={plumber}
                            alt="Plumber"
                            className="mx-auto mb-4 w-60 h-60 object-cover rounded-lg"
                            loading="lazy"
                        />
                        <h3 className="text-xl font-semibold mb-2">Plumber</h3>
                        <p>Get expert plumbers at your doorstep.</p>
                    </div>

                    {/* Service Card 2 */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
                        <img
                            src={electrician}
                            alt="Electrician"
                            className="mx-auto mb-4 w-60 h-60 object-cover rounded-lg"
                            loading="lazy"
                        />
                        <h3 className="text-xl font-semibold mb-2">Electrician</h3>
                        <p>Professional electricians for all your needs.</p>
                    </div>

                    {/* Service Card 3 */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
                        <img
                            src={beautician}
                            alt="Beautician"
                            className="mx-auto mb-4 w-60 h-60 object-cover rounded-lg"
                            loading="lazy"
                        />
                        <h3 className="text-xl font-semibold mb-2">Beautician</h3>
                        <p>Skilled beauticians for home services.</p>
                    </div>

                    {/* Service Card 4 */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
                        <img
                            src={carpenter}
                            alt="Carpenter"
                            className="mx-auto mb-4 w-60 h-60 object-cover rounded-lg"
                            loading="lazy"
                        />
                        <h3 className="text-xl font-semibold mb-2">Carpenter</h3>
                        <p>Expert carpenters for any repair work.</p>
                    </div>
                </div>
            </section>



            {/* How It Works Section */}
            <section className="bg-gray-100 py-20 px-10">
                <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">

                    {/* Step 1 */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">Search Services</h3>
                        <p>Find the right professional for your need in your area.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">Book Online</h3>
                        <p>Choose a date & time that works for you and book instantly.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <div className="text-4xl mb-4">👷‍♂️</div>
                        <h3 className="text-xl font-semibold mb-2">Professional Arrives</h3>
                        <p>The service provider comes to your location at the scheduled time.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <div className="text-4xl mb-4">💳</div>
                        <h3 className="text-xl font-semibold mb-2">Pay & Rate</h3>
                        <p>Pay securely online and leave a rating for the service.</p>
                    </div>
                </div>
            </section>



        </>
    );
}

export default Home;
