/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useGetAllVerifyInFoQuery } from "@/redux/features/payment/paymentAPi";
import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import moment from "moment-timezone";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const page = () => {
  const { data: verifyedInFo, isLoading } = useGetAllVerifyInFoQuery(undefined);
  const { register, handleSubmit, watch } = useForm();

  const months = moment.months();
  const monthOptions = months.map((month) => ({ key: month, label: month }));

  const selectedMonth = watch("month");

  const filteredData = verifyedInFo?.data?.filter((item: any) => {
    const itemMonth = moment(item.date).format("MMMM"); 
    return selectedMonth ? itemMonth === selectedMonth : true;
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log("Form submitted with:", data);
  };

  return (
    <div className="px-10 py-5">
        <h1 className="text-2xl text-center">Payment Management</h1>
      <div className="flex justify-end">
        <div className="w-full pb-2 md:w-[300] lg:w-[200px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              label="Select a month"
              {...register("month")}
              size="sm"
              variant="bordered"
            >
              {monthOptions.map((month) => (
                <SelectItem key={month.key} value={month.key}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </form>
        </div>
      </div>

      {/* Table */}
      <Table isHeaderSticky isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Transaction Id</TableColumn>
          <TableColumn>Processor</TableColumn>
        </TableHeader>
        <TableBody>
          
          {isLoading
            ? Array.from({ length: 6 })?.map((_, idx) => (
                <TableRow key={idx} className="text-center">
                  {Array(6)
                    .fill(null)
                    .map((_, idx) => (
                      <TableCell className=" " key={idx}>
                        <Skeleton className="w-full h-8 rounded" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
            :
          
          filteredData?.map((item: any,idx:number) => (
            <TableRow key={item?._id}>
              <TableCell>{idx+1}</TableCell>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{moment(item?.date).tz("Asia/Dhaka").format("lll")}</TableCell>
              <TableCell>{item?.totalPay}</TableCell>
              <TableCell>{item?.transactionId}</TableCell>
              <TableCell className="uppercase">{item?.payment_processor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;