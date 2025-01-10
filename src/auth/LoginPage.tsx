import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputType, userLoginSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState<LoginInputType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputType>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(input); //to check whether input is coming or not
    const result = userLoginSchema.safeParse(input);
    if(!result.success) {
        const fieldErrors = result.error.formErrors.fieldErrors;
        setErrors(fieldErrors as Partial<LoginInputType>);
        return
    }

    // reseting the form inputs
    setInput({
      email: "",
      password: "",
    });
  };
  const loading = false;
  return (
    <div className="flex items-center  justify-center min-h-screen ">
      <form
        onSubmit={submitHandler}
        className="md:p-8 w-full max-w-md md:border border-gray-200 rounde  mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold  text-center text-2xl">Welcom ,Back</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              value={input.email}
              onChange={changeEventHandler}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs  text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              value={input.password}
              onChange={changeEventHandler}
              type="password"
              name="password"
              placeholder="******"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && <span className="text-xs  text-red-500">{errors.email}</span>}
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
            Login
          </Button>
        )}

        <Separator className="mt-7" />

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create an account.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
