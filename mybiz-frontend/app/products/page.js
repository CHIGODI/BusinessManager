import NavBar from "../components/navbar";
import SideNav from "../components/sidenav";
import AddProductsButtonAndForm from "./components/AddProductsButtonAndForm";

const allProducts = () => {
    const handleAddProduct = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/products/',
                product,
                {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('access_token')}`,
                    }
                }
            );
            if (response.status === 200) {

            }
        } catch (error) {

        }
    };

    return(
            <div className="h-screen">
            <div className={`absolute inset-0 `}>
                {/* Background content goes here */}
            </div>

                <NavBar />
                <div className="relative flex flex-row w-full h-full">
                    <SideNav />
                <div className="w-[80%] px-[2%] py-[2%]
                                h-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-600">All Products</h2>
                        <AddProductsButtonAndForm />
                    </div>
                    <div className="rounded-xl border h-full
                                    shadow-sm overflow-y-scroll scrollbar-thin
                                    scrollbar-thumb-rounded-full
                                    scrollbar-track-rounded
                                    scrollbar-thumb-gray-500
                                    scrollbar-track-gray-300
                                    bg-white"
                    >
                        <ul>

                        </ul>
                    </div>
                </div>
                </div>
            </div>
    );
};
export default allProducts;