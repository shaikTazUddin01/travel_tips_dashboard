"use client";
import { useGetMyInFoQuery } from "@/redux/features/user/userApi";
import { useGetMyFollowersQuery } from "@/redux/features/followers/followersAPi";
import bg from "@/assets/login1.webp";
import EditImage from "@/components/admin/ui/profile/EditImage";
import EditProfile from "@/components/admin/ui/profile/EditProfile";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { Image } from "@nextui-org/image";
import { TPost, TUser } from "@/types";
import { useGetMyPostQuery } from "@/redux/features/post/postApi";
import FriendCard from "@/components/admin/ui/profile/friendcard/FriendCard";
import { Divider } from "@nextui-org/divider";
import FollowCard from "@/components/admin/ui/profile/followersCard/FollowersCard";
const ProfileHeader = () => {
  //   get user Data
  const { data: userData } = useGetMyInFoQuery(undefined);
  //   get my followers
  const { data: myfollowers } = useGetMyFollowersQuery(undefined);
  const userInFo = userData?.data;

  const { data: myPost } = useGetMyPostQuery(undefined);
  // console.log(userInFo);

  return (
    <div className="md:px-20 md:py-5">
      {/* ----------header----- */}
      <div className="relative ">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
        />

        <div className="-mt-5 lg:mx-5">
          <div className="flex flex-col md:flex-row gap-1 items-center">
            <EditImage user={userInFo} />

            <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start flex-1 w-full">
              <div className="text-center md:text-left">
                <h1 className="font-medium text-xl">{userInFo?.name}</h1>

                {/* <p className="text-sm text-default-600">@tazahmedcs23</p> */}
                <p className=" text-blue-600 flex gap-2 items-center mt-1">
                  {/* <Link href={'/friends'}> */}
                  <span className="border-r-2 border-blue-500 pr-2 ">
                    {userInFo?.myFriendList?.length
                      ? userInFo?.myFriendList?.length
                      : "0"}{" "}
                    Friends
                  </span>
                  {/* </Link> */}
                  {/* <Link href={'/followers'}> */}
                  <span className=" ">
                    {myfollowers?.data?.followers?.length
                      ? myfollowers?.data?.followers?.length
                      : "0"}{" "}
                    Followers
                  </span>
                  {/* </Link> */}
                  {/* <span>- 150 Following</span> */}
                </p>
              </div>
              {/* button */}
              <div className="flex gap-2">
                {/*edit button  */}
                <div className="flex-1">
                  <EditProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------header--------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        {/* left side */}
        {/* intro */}
        <div className="">
          <div className="rounded-xl border shadow-lg  p-3 flex-1 ">
            <h1 className="text-[22px] font-semibold">Intro</h1>
            <div className="space-y-2 mt-2">
              <h1 className="flex items-start gap-1">
                <span className="text-xl pt-1">
                  <MdEmail />
                </span>
                <span>
                  sent message{" "}
                  <span className="font-medium">{userInFo?.email}</span>
                </span>
              </h1>
              <h1 className="flex items-start gap-1">
                <span className="text-xl pt-1">
                  <MdPhone />
                </span>
                <span>
                  contact to{" "}
                  <span className="font-medium">{userInFo?.phoneNumber}</span>
                </span>
              </h1>
              <h1 className="flex items-start gap-1">
                <span className="text-xl pt-1">
                  <MdLocationPin />
                </span>
                <span>
                  from <span className="font-medium">{userInFo?.address}</span>
                </span>
              </h1>
            </div>
            <div className="flex-1 mt-2">
              <EditProfile />
            </div>
          </div>
          {/* photos */}
          <div className="rounded-xl border shadow-lg  p-3 mt-5 md:mt-0 lg:mt-5 flex-1 ">
            <h1 className="text-[22px] font-semibold">Photos</h1>
            <div className="flex flex-wrap gap-2 rounded-xl overflow-hidden">
              {myPost?.data?.length > 0 ? (
                myPost?.data?.map((item: TPost) => {
                  return (
                    <Image
                      key={item?._id}
                      alt="photos"
                      className="size-[97] object-cover"
                      height={100}
                      src={item?.image}
                      width={100}
                    />
                  );
                })
              ) : (
                <p className="">No photo added.!</p>
              )}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className=" md:col-span-2 px-5 md:px-0">
          {/* friend */}
          <div className="border-1  w-full rounded-xl">
            <div className="p-4">
              <h1>
                Friends:{" "}
                {userInFo?.myFriendList?.length
                  ? userInFo?.myFriendList?.length
                  : "0"}
              </h1>
            </div>
            <Divider />
            {/* friend */}
            <div className="mt-2">
              {userInFo?.myFriendList?.length > 0 ? (
                userInFo?.myFriendList?.map((friend: TUser) => (
                  <FriendCard key={friend?._id} friend={friend} />
                ))
              ) : (
                <div>
                  <h1 className="text-center py-2">
                    currently you have no friend.!
                  </h1>
                </div>
              )}
            </div>
          </div>
          {/* followers */}
          <div className="border-1  w-full rounded-xl mt-5">
            <div className="p-4">
              <h1>{myfollowers?.data?.followers?.length} Followers</h1>
            </div>
            <Divider />
            {/* followers */}
            <div className="mt-2">
              {myfollowers?.data?.followers?.map((follower: TUser) => (
                <FollowCard key={follower?._id} people={follower} />
              ))}
            </div>
          </div>
        </div>
        {/* right side */}
      </div>
    </div>
  );
};

export default ProfileHeader;
