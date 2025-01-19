import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/authSlice.ts";
import { RootState } from "@/redux/store";
import {TnCSheet} from "@/components/tncsheet.tsx";

// Define Zod schema for validation
const signUpSchema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    dob: z.string().nonempty("Date of Birth is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    agreeToTerms: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the Terms and Conditions" }),
    }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm({
                               className,
                               ...props
                           }: React.ComponentPropsWithoutRef<"form">) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error: registerError } = useSelector(
        (state: RootState) => state.auth
    );

    const {
        register: formRegister,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await dispatch(register(data)).unwrap();
            navigate("/"); // Navigate to another page upon success
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <div className="grid gap-6">
                {registerError && (
                    <div className="text-red-500 text-sm">{registerError}</div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...formRegister("firstName")} placeholder="John" />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...formRegister("lastName")} placeholder="Doe" />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" {...formRegister("dob")} />
                    {errors.dob && (
                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...formRegister("email")}
                        placeholder="m@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        {...formRegister("password")}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="agreeToTerms"
                            onCheckedChange={(checked) => {
                                setValue("agreeToTerms", checked === true); // Explicitly pass a boolean
                            }}
                        />
                        <Label htmlFor="agreeToTerms" className="flex items-center space-x-1">
                            <span>I agree to the</span>
                            <TnCSheet />
                        </Label>
                    </div>
                    {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="underline underline-offset-4">
                        Log in
                    </Link>
                </div>
            </div>
        </form>
    );
}