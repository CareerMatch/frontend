import Navbar from "../components/navbar.tsx";
import Hero from "@/components/hero.tsx";

const Homepage = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section Placeholder */}

                <Hero/>

            {/* Additional Sections */}
            <section className="p-8">
                <h2 className="text-2xl font-bold mb-4">Welcome to My Website</h2>
                <p className="text-gray-600">
                    This is the homepage. Add your hero section or other components here.
                </p>
            </section>
        </div>
    );
};

export default Homepage;