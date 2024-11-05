/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import { useUpdateProfileImageMutation } from "@/redux/features/user/userApi";
import { TResponse, TUser } from "@/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaImages } from "react-icons/fa";
import { IoIosCamera } from "react-icons/io";
import { toast } from "sonner";



const EditImage = ({ user }: { user: TUser }) => {
  const [trigger, setTrigger] = useState(false);
  // Image file states
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Update mutation
  const [profileImageUpdate, { isLoading }] = useUpdateProfileImageMutation();
  const { handleSubmit } = useForm();

  const handleImageSubmit = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpdate: SubmitHandler<FieldValues> = async () => {
    if (imageFile) {
    //   const toastId = toast.loading("Updating...");
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = (await profileImageUpdate(formData)) as TResponse<any>;
        if (res?.data) {
          toast.success("Update success", {  duration: 1000 });
          setTrigger(false);
          setImageFile(null);
          setImagePreview(null);
        } else {
          toast.error(res?.error?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div>
      {/* Profile image with camera icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setTrigger(!trigger)}
      >
        <Image
          className="size-[150px] -mt-3 border-3 border-white"
          radius="full"
          src={user?.image}
          alt={user?.name}
        />
        <span className="absolute top-24 right-0 z-20 bg-white rounded-full p-1 text-2xl">
          <IoIosCamera />
        </span>
      </div>

      {/* Modal for updating the image */}
      {trigger && (
        <>
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setTrigger(false)}
          />

          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] sm:w-[400px] relative">
                <div className="flex justify-end">
                <h1 className="-mt-2 cursor-pointer rounded-full" onClick={()=>setTrigger(false)}>X</h1>
                </div>
              <form onSubmit={handleSubmit(handleImageUpdate)}>
                <div className="flex flex-col items-center gap-4">
                  {/* Preview the selected image */}
                  {imagePreview ? (
                    <Image
                      alt="Selected Image"
                      className="rounded-lg object-cover size-[200]"
                      src={imagePreview}
                    />
                  ) : (
                    <p>No image selected</p>
                  )}

                  {/* Upload button */}
                  {!imageFile && (
                    <label
                      className="border-2 border-gray-300 p-3 w-full text-center rounded-lg cursor-pointer hover:bg-slate-200"
                      htmlFor="image"
                    >
                      <FaImages className="inline mr-2" />
                      Choose an Image
                    </label>
                  )}
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={handleImageSubmit}
                  />

                  {/* Submit button */}
                  {imagePreview && !isLoading && (
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  )}
                  
                  {imagePreview && isLoading && (
                    <Button isLoading className="w-full" color="primary">
                updating...
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditImage;
