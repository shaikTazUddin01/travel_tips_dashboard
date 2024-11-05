"use client";
import BarChartSection from "@/components/admin/ui/Dashboard/Barchart";
import HeaderCard from "@/components/admin/ui/Dashboard/HeaderCard";
import { StackedAreaChart } from "@/components/admin/ui/Dashboard/StackedAreaChart";
// import { Button } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div className="p-5">
      {/* header card */}
      <div>
        <HeaderCard />
      </div>
      {/* chart area */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3  ">
          <div className="w-full flex flex-col lg:flex-row gap-2">
            <BarChartSection />
            <StackedAreaChart/>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
