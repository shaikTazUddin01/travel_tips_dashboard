/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import ContentUpdateByAdmin from "@/components/admin/ui/manageContent/UpdateContent";
import {
  useDeletePostByAdminMutation,
  useGetPostByAdminQuery,
} from "@/redux/features/post/postApi";
import { TPost, TResponse } from "@/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function page() {
  const { data: allPost, isLoading } = useGetPostByAdminQuery(undefined);
  const [deletePost] = useDeletePostByAdminMutation();

  const handleDeletePost = async (id: string) => {
    try {
      // before delete alert
      Swal.fire({
        title: "Are you sure?",
        text: "You went to delete this Post",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("deleting....");

          // delete mutation
          const res = (await deletePost(id)) as TResponse<any>;
          console.log(res);
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
    <div className="px-10 py-5">
      <h1 className="text-center text-2xl mb-3">Content Management</h1>
      <Table aria-label="static collection table">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Like</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 8 })?.map((_, idx) => (
                <TableRow key={idx} className="text-center">
                  {Array(7)
                    .fill(null)
                    .map((_, idx) => (
                      <TableCell className=" " key={idx}>
                        <Skeleton className="w-full h-8 rounded" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
            : allPost?.data?.map((post: TPost) => {
                return (
                  <TableRow key={post?._id}>
                    <TableCell>
                      <Image className="size-10" src={post?.image} alt={post?.category} />
                    </TableCell>
                    <TableCell>{post?.user?.name}</TableCell>
                    <TableCell>{post?.category}</TableCell>
                    <TableCell>{post?.type}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          post?.status == "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {post?.status}
                      </span>
                    </TableCell>
                    <TableCell>{post?.like?.length}</TableCell>

                    <TableCell className="flex justify-center gap-2">
                      {/* edit user */}
                      <ContentUpdateByAdmin data={post} id={post?._id as string} />
                      {/* delete user */}
                      <Button
                        className="text-xl text-red-500"
                        size="sm"
                        variant="flat"
                        onClick={() => handleDeletePost(post?._id)}
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
