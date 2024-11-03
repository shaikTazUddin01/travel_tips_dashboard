/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import loginImage from "@/assets/travelLogin.jpg";
import login1 from "@/assets/login1.jpg";

import { useLoginApiMutation } from "@/redux/features/auth/authApi";
import { decodedToken } from "@/utils/decodedToken";

import { authInfo } from "@/redux/features/auth/authSlice";

import TDForm from "@/components/admin/ui/form/TDForm";
import TDInput from "@/components/admin/ui/form/TDInput";
import { TResponse } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { loginValidation } from "@/validation/loginValidation";
// import { cookies } from "next/headers";
// import { userInfo } from "@/src/redux/features/auth/authSlice";

const page = () => {
  const [login] = useLoginApiMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  // handle login
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await login(data)) as TResponse<any>;
      // console.log(res?.data?.data?.accessToken);
      if (res?.data) {
        toast.success("login success");

        // redirect
        router.push("/");

        // get access
        const accessToken = res?.data?.data?.accessToken;
        const decoded = await decodedToken(accessToken);
        // console.log(accessToken);
        // set cookies
        document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=Strict`;

        dispatch(authInfo({ data: decoded, token: accessToken }));
        // console.log(decoded);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div
      className=" min-h-screen w-full lg:p-20 bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${login1.src})` }}
    >
      <div className="bg-white rounded-2xl h-full  grid  grid-cols-1 lg:grid-cols-2 shadow items-center mx-auto max-w-7xl">
        <div className="">
          <Image
            alt="login image"
            className="rounded-2xl hidden lg:flex object-cover w-full h-full"
            src={loginImage}
          />
        </div>
        <div className="text-center mx-auto w-full lg:w-[80%] p-10">
          <div className="space-y-1 mb-2">
            <h1 className="text-sky-600 text-3xl lg:text-5xl font-bold ">Wellcome</h1>
            <p>Login with Email</p>
          </div>
          <TDForm
            resolver={zodResolver(loginValidation)}
            onSubmit={handleLogin}
          >
            <div className="space-y-2 text-left">
              <TDInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
              <TDInput
                label="Password"
                name="password"
                required={true}
                type="password"
                variant="bordered"
              />
              <Link href={"/forgotPassword"}>
                <p className="text-right text-[14px] text-default-500 hover:text-blue-600">
                  Forgot Password?
                </p>
              </Link>
              <Button className="w-full" color="primary" type="submit">
                Login
              </Button>
            </div>
          </TDForm>
          <p>
            I Don&#39;t have an accout.?{" "}
            {/* <Link
              className="text-blue-800 mt-1 hover:text-blue-700"
              href={"/signup"}
            >
              Sign Up
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;