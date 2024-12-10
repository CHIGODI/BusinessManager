import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function LandingPage() {

    return (
        <div className="h-screen ml-[5%] mr-[5%]">
            <NavBar />
            <section className="flex flex-row md:flex-row justify-between px-8 py-16 gap-10">
                <div className="md:w-1/2 flex flex-col items-center mt-[8%] text-center">
                    <h2 className="text-4xl font-bold text-[#001F3F] pb-4 ">
                        Think, plan and track all in one place
                    </h2>
                    <p className="text-lg text-[#31363F] pb-4">
                        Efficiently manage your business and boost productivity.
                    </p>
                    <button className="bg-purple-600 text-white px-3 py-3 text-lg rounded hover:bg-blue-700 w-1/2">
                        Get started
                    </button>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src="/Images/Landing2.jpg"
                        alt="ChronoTask Dashboard"
                        className="rounded-lg"
                    />
                </div>
            </section>
            <section className="services"></section>
            <Footer />
        </div>
    );
}
