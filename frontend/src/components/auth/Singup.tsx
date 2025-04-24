"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { SingupSchema } from "@/schema";
import { createUser } from "@/api/Users";
import { useRouter } from "next/navigation"
type SingupTypes = z.infer<typeof SingupSchema>;

export default function Singup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SingupTypes>({
        resolver: zodResolver(SingupSchema),
    });
    const router = useRouter()


    const onSubmit = async (data: SingupTypes) => {

        try {
            await createUser(data.email, data.Password, data.name);
            toast.success("Successfully created user");
        } catch (error) {
            console.error(error);
        } finally {

        }
    };
    const handleContinueWithGoogle = async () => {
        try {
            await signIn("google", { callbackUrl: "/blogs" });
        }
        catch (error) {
            console.log(error)
        }
        finally {
            router.push("/blogs")
        }
    };


    return (
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 min-h-dvh">
                <div className="bg-white text-black flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
                    <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-[30vw] h-48 sm:h-56 md:h-64 lg:h-[30vh] mb-4 sm:mb-8">
                        <Image
                            src="/signinpage.png"
                            alt="Sign In"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center space-y-2 font-medium w-full px-4">
                        <p className="font-bold text-xl sm:text-2xl">
                            Users shouldn't feel left out
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg">
                            Use DueTrack, and make them feel special
                        </p>
                    </div>
                </div>

                <div className="bg-black text-white flex flex-col gap-6 items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center">
                        Create your account
                    </h2>

                    <div className="w-[90%] flex justify-center">
                        <Button className="bg-white text-black hover:bg-amber-50 w-full sm:w-2/3 md:w-1/2 lg:w-[30%] border-0" onClick={handleContinueWithGoogle} >
                            Continue With google
                        </Button>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4 sm:space-y-6"
                    >
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                {...register("name")}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                {...register("email")}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                {...register("Password")}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="********"
                            />
                            {errors.Password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.Password.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full justify-center flex flex-col items-center gap-3 sm:gap-4 mt-4">
                            <Button className="bg-white text-black hover:bg-amber-50 w-full sm:w-2/3 md:w-1/2 lg:w-[30%]">
                                Continue
                            </Button>
                            <div className="text-sm sm:text-base">
                                Don't have an account?
                                <Link href="/signin">
                                    <span className="underline"> Signin</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
