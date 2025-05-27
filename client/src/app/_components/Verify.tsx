"use client";

import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Verify = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

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
          <h3 className="font-semibold text-2xl ">Please verify Your Email </h3>
          <p className="text-[#71717A] text-base font-normal">
            We just sent an email to <strong>{userEmail}</strong>. Click the
            link in the email to verify your account
          </p>
        </div>
        {userEmail && (
          <Formik
            initialValues={{ email: userEmail }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await axios.post(
                  "http://localhost:8000/auth/reset-password-request",
                  values
                );
                localStorage.setItem("token", res.data.token);
                alert("Email resent successfully!");
              } catch (error: any) {
                alert(error.response?.data?.message || "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-y-4">
                <Button
                  variant="outline"
                  className="hover:text-[#FAFAFA] hover:bg-[#18181B]"
                  type="submit"
                >
                  Resend email
                </Button>
              </Form>
            )}
          </Formik>
        )}
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
