import { FC } from "react";
import { Menu } from "lucide-react";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
    const handleClickInsideSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();
      };
    
  return (
    <div>
      <div>
        <div className="absolute top-2 z-50 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <Menu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </div>

        <div className="p-6 w-[75%] h-screen border-r border-gray-300 bg-white fixed top-12 -left-96 lg:left-0 lg:w-[25%]  peer-focus:left-0 peer:transition ease-out delay-150 duration-200" onClick={handleClickInsideSidebar}>
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-xl text-start cursor-pointer font-bold text-gray-600 border-b border-gray-100 pb-4 w-full">
              Comment
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </div>
              
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className="min-h-screen">
              <div className="flex sticky top-[90vh] mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <input type="text" />
                <h3 className="text-sm text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
