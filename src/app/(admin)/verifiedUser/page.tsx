"use client";
import EditUser from "@/components/admin/ui/userManagement/EditUser";
import {
  useAlluserQuery,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import { TResponse, TUser } from "@/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function VerifiedUser() {
  const { data: allUser ,isLoading} = useAlluserQuery({verified:true});
  const [deleteUser] = useDeleteUserMutation();
  console.log(allUser);
  const handleDeleteUser = async (id: string) => {
    try {
      // before delete alert
      Swal.fire({
        title: "Are you sure?",
        text: "You went to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("deleting....");

          // delete mutation
          const res = (await deleteUser(id)) as TResponse<any>;
          if (res?.data) {
            toast.warning("Delete Success", { id: toastId, duration: 1000 });
          } else {
            toast.error(res?.error?.data?.message, { id: toastId });
          }
        }
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full px-10 py-5">
      <h1 className="text-2xl text-center mb-3">Verified User</h1>
      <Table aria-label="static collection table" className="w-full mx-auto">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>Verify</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          
          
          {isLoading ?
            Array.from({ length: 8 })
              ?.map((_, idx) => (
                <TableRow key={idx} className="text-center">
                  {
                    Array(6).fill(null).map((_,idx)=>(
                  <TableCell className=" " key={idx}>
                    <Skeleton className="w-full h-8 rounded" />
                  </TableCell>
                ))  
                }
                </TableRow>
              ))
          :allUser?.data?.map((user: TUser) => {
            return (
              <TableRow key={user?._id} className="text-center">
                <TableCell className=" ">
                  <Image className="size-10 " src={user?.image} alt="user" />
                </TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.isVerify?"verified":"false"}</TableCell>
                <TableCell
                  className={`${
                    user?.status == "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user?.status}
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  {/* edit user */}
                  <EditUser data={user} id={user?._id as string} />
                  {/* delete user */}
                  <Button
                    className="text-xl text-red-500 "
                    size="sm"
                    variant="flat"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    <AiFillDelete />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
