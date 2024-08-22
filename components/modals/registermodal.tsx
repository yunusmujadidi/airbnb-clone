"use client";
import { Github } from "lucide-react";
import { Google } from "../icon";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "./modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../heading";
import RegisterInput from "./registerinput";
import toast, { Toaster } from "react-hot-toast";
import Button from "../button";
import { submitRegister } from "@/lib/actions/registeraction";
import { signIn } from "next-auth/react";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await submitRegister(values);

      if (response?.success) {
        toast.success("Account created successfully!");
        registerModal.onClose();
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an new account!" />
      <RegisterInput
        id="email"
        label="Email"
        disabled={isLoading}
        errors={form.formState.errors}
        register={form.register}
        required
      />
      <RegisterInput
        id="name"
        label="Name"
        disabled={isLoading}
        errors={form.formState.errors}
        register={form.register}
        required
      />
      <RegisterInput
        id="password"
        label="Password"
        disabled={isLoading}
        errors={form.formState.errors}
        register={form.register}
        required
        type="password"
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        google
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        label="Continue with Github"
        Icon={Github}
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={form.handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
