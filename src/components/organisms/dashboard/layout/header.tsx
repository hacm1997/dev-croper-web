import Image from "next/image";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

interface Props {
  toggleMenu: () => void;
}

export const HeaderMenu = ({ toggleMenu }: Props) => {
  return (
    <div>
      <nav className="bg-[#14171F] border-b border-[#19B3A9]">
        <div className="flex justify-between items-center px-9">
          <button
            id="menuBtn"
            className="visible md:invisible z-50"
            onClick={toggleMenu}
          >
            <FaBars className="text-[#E4E4E7] text-[20px] cursor-pointer" />
          </button>

          <div className="ml-1 p-2">
            <Image
              src="/icons/bank-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </div>

          <div className="space-x-4">
            <button>
              <IoMdNotificationsOutline className="text-cyan-500 text-[22px] cursor-pointer" />
            </button>

            <button>
              <FaRegUser className="text-cyan-500 text-[20px] cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
