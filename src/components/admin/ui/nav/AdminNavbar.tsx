"use client";
import { logout } from "@/redux/features/auth/authSlice";
import { toggleBtn } from "@/redux/features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { toast } from "sonner";

const AdminNavbar = () => {
    const router = useRouter();
  const dispatch = useAppDispatch();
  const { toggle } = useAppSelector((state) => state.toggle);

  const handleToggle = () => {
    dispatch(toggleBtn(!toggle));
  };

    const handleLogout = () => {
      dispatch(logout());

      document.cookie =
        "accessToken=; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";

      router.push("/login");

      toast.warning("Log out success!");
    };
  return (
    <div className=" bg-[#212020] flex justify-between lg:justify-end p-5 w-full items-center text-white">
      <div className="visible lg:hidden text-default-100 text-3xl">
        {toggle ? (
          <span onClick={() => handleToggle()}>
            <AiOutlineClose />
          </span>
        ) : (
          <span onClick={() => handleToggle()}>
            <FiMenu />
          </span>
        )}
      </div>
      <Button
        onClick={() => handleLogout()}
        className="text-default-100 border-default-100"
        variant="bordered"

      >
        LogOut
      </Button>
      {/* <Button color="primary">LogOut</Button> */}
    </div>
  );
};

export default AdminNavbar;
