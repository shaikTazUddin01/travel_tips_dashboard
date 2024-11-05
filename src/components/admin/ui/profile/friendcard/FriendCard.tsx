
import { TUser } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import Link from "next/link";
import React from "react";


const FriendCard = ({ friend }: { friend: TUser }) => {
  return (
    <div className="w-full px-5 mt-3">
      <div className="">
        <div className="flex gap-2">
       
            <Avatar isBordered radius="full" size="lg" src={friend?.image} />
       
          <div className="flex flex-col gap-1 items-start justify-center">
        
              <h4 className="text-small font-semibold leading-none text-default-700">
                {friend?.name}
              </h4>
              <h4 className="text-small font-semibold leading-none text-default-500 pt-1">
                {friend?.address}
              </h4>
         
            <h5 className="text-small tracking-tight text-default-400">
              {/* @zoeylang */}
            </h5>
          </div>
        </div>
        
      </div>
      <div className="mt-3">
        <Divider />
      </div>
    </div>
  );
};

export default FriendCard;
