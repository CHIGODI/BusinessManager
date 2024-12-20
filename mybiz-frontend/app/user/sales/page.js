import NavBar from "@/app/sharedComponents/Navbar";
import SideNav from "@/app/sharedComponents/SideNav";
import withRole from "@/app/hoc/withRole";

const DaySales = () => {
    return (
        <div className="h-screen box-border">
            <NavBar />
            <div className="flex flex-row w-full h-screen justify-center">
                <SideNav />
                <div className='w-[80%] pr-[5%] pl-[5%] pt-[5%]
                                flex flex-col lg:flex-row
                                lg:flex-wrap gap-4'
                >
                    <h1>Sales</h1>
                </div>
            </div>
        </div>
    );
};
export default withRole(DaySales, ["user"]);