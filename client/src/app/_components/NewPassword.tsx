"use client";

import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-medium">
        Reset token is missing.
      </div>
    );
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "please must be at least 8 characters")
      .required("password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),
  });

  return (
    <div className="flex gap-x-12 h-full items-center px-[100px]">
      <div className="flex flex-1 flex-col gap-y-6 max-w-[416px]">
        <div className="cursor-pointer hover:bg-black w-9 h-9 border rounded-md flex justify-center items-center border-[#e4e4e7]">
          <ChevronLeft className="w-4 h-8 text-[#18181B] hover:text-white" />
        </div>

        <div className="flex gap-y-[4px] flex-col">
          <h3 className="font-semibold text-2xl">Create new password</h3>
          <p className="text-[#71717A] text-base font-normal">
            Set a new password with a combination of letters and numbers for
            better security.
          </p>
        </div>

        <Formik
          initialValues={{ password: "", confirm: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.post(
                "http://localhost:8000/auth/reset-password",
                {
                  newPassword: values.password,
                  confirmPassword: values.confirm,
                  token: token,
                }
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
              <div>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded-md h-9 px-3"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <div>
                <Field
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full border rounded-md h-9 px-3"
                />
                {errors.confirm && touched.confirm && (
                  <div className="text-red-500 text-sm">{errors.confirm}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">
                  Show password
                </label>
              </div>

              <Button
                variant="outline"
                className="hover:text-[#FAFAFA] hover:bg-[#18181B]"
                type="submit"
              >
                Create Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="relative h-[90%] w-[75%]">
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
