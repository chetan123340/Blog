import { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Button } from "./index"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

function Signup() {
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser
                dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(signup)} >
                        <div className="space-y-5">
                            <Input
                                type="text"
                                placeholder="Enter Full Name"
                                label="Full Name: "
                                {
                                ...register("name", {
                                    required: true
                                })
                                }
                            />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                label="Email: "
                                {
                                ...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => {
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address"
                                        }
                                    }
                                })
                                }
                            />
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                label="Password: "
                                {
                                ...register("password", {
                                    required: true
                                })
                                }
                            />
                            <Button type="submit" className="w-full">Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;