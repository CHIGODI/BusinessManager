import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Image from "next/image";

export default function LandingPage() {

    return (
        <div className="h-screen md:ml-[5%] md:mr-[5%]">
            <NavBar />
            <section className="flex flex-col justify-between px-8 py-16 gap-10 md:flex-row">
                <div className="md:w-1/2 flex flex-col items-center mt-[8%] text-center">
                    <header>
                        <h2 className="text-4xl font-bold text-[#001F3F] pb-4 ">
                            Welcome to myBIZ
                        </h2>
                        <p className="text-lg text-[#31363F] pb-4">
                            Your one-stop solution for managing your business.
                        </p>
                    </header>
                    <button className="bg-purple-600 text-white px-3 py-3 text-lg rounded hover:bg-blue-700 w-1/2">
                        Get started
                    </button>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <Image
                        src="/Images/Landing2.jpg"
                        alt="ChronoTask Dashboard"
                        width={300}
                        height={100}
                        className="rounded-lg"
                    />
                </div>
            </section>
            <section className="services"></section>
            <Footer />
        </div>
    );
};