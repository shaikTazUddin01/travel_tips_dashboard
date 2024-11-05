import { useGetAllVerifyInFoQuery } from "@/redux/features/payment/paymentAPi";
import { useGetPostByAdminQuery } from "@/redux/features/post/postApi";
import { useAlluserQuery } from "@/redux/features/user/userApi";
import { FaUserAlt, FaUserCheck, FaClipboardList } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const HeaderCard = () => {
  const { data: AllVerify } = useGetAllVerifyInFoQuery(undefined);
  const { data: AllUser } = useAlluserQuery({});
  const { data: AllPost } = useGetPostByAdminQuery(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cardData = [
    {
      title: "Total Users",
      count: AllUser?.data?.length || 0,
      icon: <FaUserAlt />,
      color: "bg-blue-600",
    },
    {
      title: "Verified Users",
      count: AllVerify?.data?.length || 0,
      icon: <FaUserCheck />,
      color: "bg-green-600",
    },
    {
      title: "Total Posts",
      count: AllPost?.data?.length || 0,
      icon: <FaClipboardList />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`transform transition duration-500 ease-in-out opacity-0 ${
            isVisible ? "opacity-100 translate-y-0" : "translate-y-5"
          } bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg p-6 flex items-center space-x-6 hover:scale-[1.02] transition-all`}
        >
         
          <div
            className={`${card.color} text-white rounded-full p-3 flex items-center justify-center text-2xl transition transform hover:rotate-12`}
          >
            {card.icon}
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 tracking-wide">{card.title}</h2>
            <p className="text-2xl font-bold text-gray-900 mt-1">{card.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeaderCard;
