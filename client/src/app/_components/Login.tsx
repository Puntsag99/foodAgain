"use client";

import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is wrong").required("Email is none"),
    password: Yup.string()
      .min(6, "password must be 6 characters long")
      .required("password is none"),
  });

  return (
    <div className="flex gap-x-12 h-full items-center px-[100px]">
      <div className=" flex flex-1 flex-col gap-y-6 max-w-[416px]">
        <div className="cursor-pointer w-9 h-9 border rounded-md flex justify-center items-center border-[#e4e4e7]">
          <ChevronLeft className="cursor-pointer w-4 h-8 text-[#18181B]" />
        </div>
        <div className="flex gap-y-[4px] flex-col">
          <h3 className="font-semibold text-2xl ">Log in</h3>
          <p className="text-[#71717A] text-base font-normal">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.post(
                "http://localhost:8000/auth/sign-in",
                values
              );
              const { token, user } = res.data;
              localStorage.setItem("token", token);
              localStorage.setItem("role", user.role);

              // alert("Successfully logged in!");

              if (user.role === "Admin") {
                router.push("/orders");
              } else {
                router.push("/");
              }
            } catch (error: any) {
              alert(error.response?.data?.message || "Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border rounded-md h-9  px-3"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md h-9 px-3"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <a
                href="#"
                className="font-normal text-sm underline"
                onClick={() => router.push("/passwordRequest")}
              >
                Forgot password?
              </a>

              <Button
                variant="outline"
                className="hover:text-[#FAFAFA] hover:bg-[#18181B]"
                type="submit"
              >
                Lets go
              </Button>
            </Form>
          )}
        </Formik>

        <div className="flex gap-x-4 justify-center">
          <p className="font-normal text-base text-[#71717A]">
            Don’t have an account?
          </p>
          <p className="text-[#2563EB] font-normal text-base">Sign up</p>
        </div>
      </div>
      <div className="relative h-[90%] w-[75%] ">
        <Image
          fill
          src="/img/Frame.png"
          alt="image"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
