import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "@/app/sharedComponents/SideNav";

const SettingsPage = () => {
    return (
            <div className="h-screen">
                <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                    <SideNav />
                    <div className="w-full md:w-[80%] px-[2%] py-[2%]
                                h-full flex flex-col gap-4 bg-yellow-400">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg text-gray-600 pt-4 pl-4">All Sales</h2>
                        </div>
                        <div className="border h-full shadow-sm overflow-y-scroll scrollbar-hidden scrollbar-thumb-rounded-full
                                        scrollbar-track-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-300 bg-white">
                            <div className="flex flex-row">
                                <p>My Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default SettingsPage;