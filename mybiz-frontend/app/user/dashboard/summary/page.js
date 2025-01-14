import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "@/app/sharedComponents/SideNav";

const Summary = () => {
    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full bg-[#F8FAFC]  flex flex-row flex-wrap gap-4">
                    <div className="border bg-white shadow-sm rounded-xl h-1/4 w-1/4">
                        <div className="p-4 ">
                            <p className="pb-2 text-xs text-gray-400">Total Today</p>
                            <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>22,0000</h2>
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl">No discount offered today</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Summary;