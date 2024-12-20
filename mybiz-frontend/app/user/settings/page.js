import NavBar from "@/app/sharedComponents/Navbar";
import SideNav from "@/app/sharedComponents/SideNav";
import withRole from "@/app/hoc/withRole";
import Settings from "@/app/sharedComponents/Settings";

const SettingsPage = () => {
    return (
        <div className="h-screen box-border">
            <NavBar />
            <div className="flex flex-row w-full h-screen justify-center">
                <SideNav />
                <div className='w-[80%] pr-[5%] pl-[5%] pt-[5%]
                                flex flex-col lg:flex-row
                                lg:flex-wrap gap-4'
                >
                    <Settings />
                </div>
            </div>
        </div>
    );
}
export default withRole(SettingsPage, ["user"]);