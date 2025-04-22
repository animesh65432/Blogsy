import { SinginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type LoginTypes = z.infer<typeof SinginSchema>;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginTypes>({
        resolver: zodResolver(SinginSchema),
    });

    const onSubmit = (data: LoginTypes) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 min-h-screen">
            <div className="bg-white text-black flex flex-col items-center justify-center px-6 py-12">
                <div className="relative w-[30vw] h-[30vh] mb-8">
                    <Image
                        src="/signinpage.png"
                        alt="Sign In"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="text-center space-y-2 font-medium">
                    <p className="font-bold lg:text-2xl text-xl">Users shouldn't feel left out</p>
                    <p className="lg:text-lg text-sm">
                        Use DueTrack, and make them feel special
                    </p>
                </div>
            </div>

            <div className="bg-black text-white flex items-center justify-center px-6 py-12">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-semibold text-center">Login to your account</h2>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            {...register("email")}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            {...register("Password")}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                        />
                        {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>}
                    </div>
                    <div className="w-full justify-center flex flex-col items-center gap-4">
                        <Button className="bg-white text-black hover:bg-amber-50 w-[30%]">Continue</Button>
                        <div>Don't have an account?<Link href="/signup"><span className="underline"> Signup</span></Link></div>
                    </div>
                </form>
            </div>
        </div>
    );
}
