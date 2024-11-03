"use client";

// import { AcmeLogof } from "@/components/navbar/AcmeLogo";
import { toggleBtn } from "@/redux/features/toggle/toggleSlice";
import Link from "next/link";
import { useEffect } from "react";
import { navbarOptions } from "./NavbarOptions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ToggleSidebar = () => {
  const dispatch = useAppDispatch();
  const { toggle } = useAppSelector((state) => state?.toggle);

  const handleCloseSidebar = () => {
    dispatch(toggleBtn(false));
  };
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggle]);
  return (
    <div
      className={`relative w-full ${
        toggle && "bg-[#3d3d3d96] translate-x-0  h-screen text-white"
      }`}
    >
      <div
        className={`bg-[#212020] text-default-100 min-h-screen p-5 w-[80%] md:w-[40%] transition-transform duration-300 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } lg:w-[50%]`}
      >
        {/* Sidebar Links */}
        <div className="">
          <ul className="space-y-1">
            {navbarOptions?.map((item) => {
              return (
                <li key={item?.label}>
                  <Link href={item?.href} onClick={handleCloseSidebar}>
                    <div className="flex items-center gap-2 hover:bg-default-700 p-3 rounded-md transition-colors">
                      {/* <span className="text-2xl">
                  {item?.icon}
                  </span> */}
                      <span>{item?.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToggleSidebar;
