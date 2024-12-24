import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "@/app/sharedComponents/SideNav";

const SettingsPage = () => {
    return (
            <div className="h-screen">
                <NavBar />
                <div className="relative flex flex-row w-full h-full">
                    <SideNav />
                    <div className="w-[80%] px-[2%] py-[2%]
                                h-full flex flex-col gap-4">
                        <p>Settings Page</p>
                    </div>
                </div>
            </div>
    );
};

export default SettingsPage;