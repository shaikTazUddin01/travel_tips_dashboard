"use client";

import { Logo } from "@/assets/icons";

import Link from "next/link";
import { navbarOptions } from "./NavbarOptions";
import { useState } from "react";


const AdminSidebar = () => {
  const[active,setActive]=useState("")
  return (
    <div className="bg-[#212020] min-h-screen p-5 w-full text-white">
      <div>
        <Link href={"/"} className="flex items-center " >
          <Logo />
          <p className="font-bold text-inherit">AGMT</p>
        </Link>
      </div>
      <div className="mt-5">
        <ul className="">
          {navbarOptions?.map((item) => {
            return (
              <Link href={item?.href} key={item?.label} onClick={()=>setActive(item?.label)}>
                <li className={`flex items-center gap-1 hover:bg-default-700 py-2 rounded-md mb-1 px-1 ${active==item?.label && "bg-default-700"} `}>
                  {/* <span className="text-2xl">{item?.icon}</span> */}
                  {item?.label}
                </li>
              </Link>
            );
          })}
        </ul>
        <div></div>
      </div>
    </div>
  );
};

export default AdminSidebar;