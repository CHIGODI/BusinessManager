import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../../components/SideNav";

const SummaryPage = () => {
    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] md:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};
export default SummaryPage;