/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-sort-props */

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";

// import { genderOptions } from "@/src/constant/options";
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useGetMyInFoQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { TResponse } from "@/types";
import { Button } from "@nextui-org/button";
import TDForm from "../form/TDForm";
import TDInput from "../form/TDInput";
import TDSelect from "../form/TDSelect";


interface IProps{
    color?:"primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
}

export default function EditProfile({color="primary"}:IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  
  const { data: userData } = useGetMyInFoQuery(undefined);
  // console.log("--->",userData);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updating....");
    try {
      const payload = {
        id: userData?.data?._id,
        updateInFo: data,
      };
      //  console.log(payload);
      const res = (await updateUser({ payload })) as TResponse<any>;

      if (res?.data) {
        toast.success("updated success", { id: toastId, duration: 1000 });
        onOpenChange();
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <>
      <Button
        className="flex justify-center items-center gap-1 w-full"
        color={color}
        size="md"
        onPress={onOpen}
      >
        <span>
          <MdEdit />
        </span>
        <span>Edit Profile</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mt-8">
                <h1 className="text-center font-medium text-xl">
                  Edit Your Profile
                </h1>
                <TDForm onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <TDInput
                      name="name"
                      label="Name"
                      defaultvalue={userData?.data?.name}
                    />
                    <TDInput
                      name="phoneNumber"
                      label="Phone Number"
                      defaultvalue={userData?.data?.phoneNumber}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <TDSelect
                        label="Gender"
                        name="gender"
                        options={[{label:"Male",key:"Male"},{label:"Female",key:"Female"},{label:"Other",key:"Other"}]}
                        required={true}
                        defaultValue={userData?.data?.gender}
                      />
                      <TDInput
                        label="age"
                        name="age"
                        required={true}
                        type="number"
                        
                        defaultvalue={userData?.data?.age}
                      />
                    </div>

                    <TDInput
                      name="address"
                      label="Address"
                      defaultvalue={userData?.data?.address}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      update now
                    </Button>
                  </div>
                </TDForm>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
