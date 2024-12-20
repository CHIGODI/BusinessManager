import withRole from "@/app/hoc/withRole";
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "@/app/sharedComponents/SideNav";

const SalesPage = () => {
    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-full">
                <SideNav />
                <div className="w-[80%] px-[2%] py-[2%]
                                h-full flex flex-col gap-4">
                    <p>Sales Page</p>
                </div>
            </div>
        </div>
    );
};

export default withRole(SalesPage, ['user']);