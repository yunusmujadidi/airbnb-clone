"use client";
import { Github } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "./modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Heading from "../heading";
import RegisterInput from "./registerinput";
import toast from "react-hot-toast";
import Button from "../button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(`Login failed: ${result.error}`);
      } else if (result?.ok) {
        loginModal.onClose();
        router.refresh();
        toast.success("Logged in successfully");
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <RegisterInput
        id="email"
        label="Email"
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
      <Button outline label="Continue with Google" google onClick={() => {}} />
      <Button
        outline
        label="Continue with Github"
        Icon={Github}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={loginModal.onClose}
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
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={form.handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
