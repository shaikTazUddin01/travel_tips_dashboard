/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-sort-props */

  import { RiEdit2Fill } from "react-icons/ri";
  import { FieldValues, SubmitHandler } from "react-hook-form";
  import { toast } from "sonner";

import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { TPost, TResponse } from "@/types";
import { useUpdateSpecificPostByAdminMutation } from "@/redux/features/post/postApi";
import TDForm from "../form/TDForm";
import TDSelect from "../form/TDSelect";
  
  export default function ContentUpdateByAdmin({
    id,
    data,
  }: {
    id: string;
    data: TPost;
  }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // update post
    const [updatePost, { isSuccess }] = useUpdateSpecificPostByAdminMutation();
  
    //   console.log("--->",data);
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("updating....");
      try {
        const payload = {
          id,
          updateInFo: data,
        };
      //   console.log(payload);
          const res = (await updatePost(payload)) as TResponse<any>;
          if (res?.data) {
            toast.success("updated success",{id:toastId,duration:1000});
            onOpenChange();
          } else {
            toast.error(res?.error?.data?.message,{id:toastId});
          }
      } catch (error: any) {
        toast.error(error?.message, { id: toastId });
      }
    };
  
    return (
      <>
        <Button onPress={onOpen} size="sm" variant="flat" className="text-xl">
          <RiEdit2Fill />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="mt-8">
                  <h1 className="text-center font-medium text-xl">Update Post</h1>
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
                        label="Post Type"
                        name="type"
                        defaultValue={data?.type}
                        options={[
                          { key: "Premium", label: "Premium" },
                          { key: "Non-Premium", label: "Non-Premium" },
                        ]}
                      />
                      <Button className="w-full" color="primary" type="submit">
                        update
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