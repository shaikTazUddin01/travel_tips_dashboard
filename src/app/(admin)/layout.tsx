// 'use client'
import AdminNavbar from "@/components/admin/ui/AdminNavbar";
import AdminSidebar from "@/components/admin/ui/Sidebar";
import ToggleSidebar from "@/components/admin/ui/ToggleSideBar";
import React, { ReactNode } from "react";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
    
      <div className="visible lg:hidden">
        <AdminNavbar />
      </div>

      <div className="flex mx-auto bg-default-50">
      
        <div className="hidden lg:flex lg:w-[15%] sticky top-0 h-screen overflow-auto">
          <AdminSidebar />
        </div>

       
        <div className="flex lg:hidden absolute w-full z-50">
          <ToggleSidebar />
        </div>
     
        <div className="min-h-screen w-full lg:w-[85%]">
          <div className="hidden lg:grid">
          <AdminNavbar/>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;