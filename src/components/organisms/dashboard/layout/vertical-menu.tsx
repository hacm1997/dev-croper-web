import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { FaCheckCircle, FaList } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutThunk } from "@/modules/auth/thunks/logoutThunk";

interface Props {
  isMenuOpen: boolean;
}
export const VerticalMenu = ({ isMenuOpen }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const email = useAppSelector((state) => state.auth.email);

  const handlerLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`z-10 fixed top-0 left-0 h-screen w-64 bg-[#14171F] border-none transition-transform duration-300 lg:block ${
        isMenuOpen ? "translate-x-0" : "-translate-x-64"
      } lg:translate-x-0`}
    >
      <div className="pt-20 px-4 space-y-4">
        <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <FaCheckCircle className="text-[#E4E4E7] text-[20px]" />
          <span>
            User: <br />
            <strong>
              {email
                ? email.length > 12
                  ? email.slice(0, 12) + "..."
                  : email
                : ""}
            </strong>
          </span>
        </div>

        <Link
          href="/dashboard"
          aria-label="dashboard"
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                        ${
                          isActive("/dashboard")
                            ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]"
                            : "text-gray-500 hover:bg-gray-800"
                        }`}
        >
          <FaList className="text-[#E4E4E7] text-[20px]" />
          <span className="-mr-1 font-medium">Products</span>
        </Link>

        <a
          onClick={handlerLogout}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group cursor-pointer"
        >
          <MdLogout className="text-[#E4E4E7] text-[20px]" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};
