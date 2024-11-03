/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-sort-props */
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { RiEdit2Fill } from "react-icons/ri";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse, TUser } from "@/types";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import TDForm from "../form/TDForm";
import TDSelect from "../form/TDSelect";

export default function EditUser({ id, data }: { id: string; data: TUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  //   console.log("--->",data);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updating....");
    try {
      const payload = {
        id,
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
        onPress={onOpen}
        size="sm"
        variant="flat"
        className="text-xl text-green-500"
      >
        <RiEdit2Fill />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mt-8">
                <h1 className="text-center font-medium text-xl">
                  Edit User Credential
                </h1>
                <TDForm onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <TDSelect
                      size="sm"
                      label="Status"
                      name="status"
                      defaultValue={data?.status}
                      options={[
                        { key: "Active", label: "Active" },
                        { key: "Blocked", label: "Blocked" },
                      ]}
                    />
                    <TDSelect
                      size="sm"
                      label="Role"
                      name="role"
                      defaultValue={data?.role}
                      options={[
                        { key: "ADMIN", label: "Admin" },
                        { key: "USER", label: "User" },
                      ]}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      Edit
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
