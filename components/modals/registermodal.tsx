"use client";
import axios from "axios";
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
import { error } from "console";

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
    } catch (error) {
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
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
