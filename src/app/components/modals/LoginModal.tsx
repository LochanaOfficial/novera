"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
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

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const switchLogin = useCallback(() => {
        registerModal.onOpen();
        loginModal.onClose();
    }, [registerModal, loginModal]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        toast.loading("Registering..");
        
        signIn("credentials", {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.dismiss();
                toast.success("Successfully Logged In")
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.dismiss();
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 -mt-2">
            <Heading
                title="Welcome Again"
                subtitle="Login To Your Account"
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
                        New To Novera
                    </div>
                    <div onClick={switchLogin} className="dark:text-neutral-100 hover:underline cursor-pointer">
                        Register
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal;