"use client";

import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";

export const ResetPassword = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().email("Email is wrong").required("Email is none"),
  });

  return (
    <div className="flex gap-x-12 h-full items-center px-[100px]">
      <div className=" flex flex-1 flex-col gap-y-6 max-w-[416px]">
        <div className="cursor-pointer hover:bg-black  w-9 h-9 border rounded-md flex justify-center items-center border-[#e4e4e7]">
          <ChevronLeft className="w-4 h-8 text-[#18181B] hover:text-white" />
        </div>
        <div className="flex gap-y-[4px] flex-col">
          <h3 className="font-semibold text-2xl ">Reset your password </h3>
          <p className="text-[#71717A] text-base font-normal">
            Enter your email to receive a password reset link.{" "}
          </p>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.post(
                "http://localhost:8000/auth/reset-password-request",
                values
              );

              localStorage.setItem("token", res.data.token);
              localStorage.setItem("email", values.email);
              alert("Verification email sent.");
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

              <Button
                variant="outline"
                className="hover:text-[#FAFAFA] hover:bg-[#18181B] cursor-pointer"
                type="submit"
                onClick={() => router.push("/verify")}
              >
                Send link
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
