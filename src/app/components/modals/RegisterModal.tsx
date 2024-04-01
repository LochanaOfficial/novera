"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "@/app/components/modals//Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { Button } from "@/components/ui/button";
import ContinueWith from "@/app/components/ContinueWith";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const switchLogin = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        toast.loading("Registering..");

        axios.post("/api/register", data)
            .then(() => {
                toast.dismiss();
                toast.success("Succesfully Registered");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("Something Went Wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 -mt-2">
            <Heading
                title="Welcome to novera"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <ContinueWith />
            <Button
                size="lg"
                className="w-full border-neutral-300 dark:border-slate-800 -mt-4 h-[49px] dark:bg-slate-900/30 dark:hover:bg-slate-900"
                variant="outline"
                onClick={() => signIn("google")}
            >
                <div className="flex items-center space-x-2">
                    <FcGoogle className="h-6 w-6" />
                    <div>
                        Google
                    </div>
                </div>
            </Button>
            <div className="dark:text-neutral-400 text-center text-sm mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account
                    </div>
                    <div onClick={switchLogin} className="dark:text-neutral-100 hover:underline cursor-pointer">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}


export default RegisterModal;