import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputType } from "@/schema/userSchema";
import {
  Loader2,
  LockKeyhole,
  Mail,
  Notebook,
  User,
  User2,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/hooks/zustand/store/useUserStore";

const SignupPage = () => {
  const [input, setInput] = useState<SignupInputType>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const {signup}  = useUserStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<SignupInputType>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async(e: FormEvent) => {
    e.preventDefault();
    console.log(input);
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputType>);
      return;
    }
    // reseting the fields
   try {
    await signup(input);
    navigate("/dashboard/job-tracker");
   } catch (error) {
    console.log(error);
   }
  };

  const loading = false;
  return (
    <div className="flex items-center  justify-center min-h-screen ">
      <form onSubmit={submitHandler} className="md:p-8 w-full max-w-md md:border border-gray-200 rounde  mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-center text-2xl">
            Create Your Account to Start Tracking Jobs!
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="mb-4">
            <div className="relative">
              <Input
                onChange={changeEventHandler}
                value={input.firstname}
                type="text"
                name="firstname"
                placeholder="John"
                className="pl-10 focus-visible:ring-1"
              />
              <User2 className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && <span className="text-red-500 text-xs">{errors.firstname}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                onChange={changeEventHandler}
                value={input.lastname}
                type="text"
                name="lastname"
                placeholder="Doe"
                className="pl-10 focus-visible:ring-1"
              />
              <Notebook className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && <span className="text-red-500 text-xs">{errors.lastname}</span>}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              value={input.username}
              type="text"
              name="username"
              placeholder="John123"
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              value={input.email}
              type="email"
              name="email"
              placeholder="john@example.com"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              value={input.password}
              type="password"
              name="password"
              placeholder="******"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>
        </div>
        {loading ? (
          <Button
            disabled
            className="bg-green hover:bg-hoverGreen w-full border-none"
          >
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Please Wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-green hover:bg-hoverGreen w-full border-none"
          >
            Signup
          </Button>
        )}

        <Separator className="mt-7" />

        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
