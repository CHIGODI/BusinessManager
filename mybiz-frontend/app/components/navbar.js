import Image from "next/image";
export default function NavBar(){
    return(
        <nav className="relative h-[70px] flex items-center justify-between border-b">
            <div className='w-[20%] h-full flex items-center pl-[2%]'>
                <Image
                    src="/Images/myBIZ.png"
                    alt="MyBiz Logo"
                    width={60}
                    height={40}
                />
            </div>
        </nav>
    )
}