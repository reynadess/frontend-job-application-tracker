import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/hooks/zustand/store/useAuthStore';
import { LoginInputType, userLoginSchema } from '@/schema/userSchema';
import { Loader2, LockKeyhole, User } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {
  const [input, setInput] = useState<LoginInputType>({
    username: '',
    password: '',
  });
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginInputType>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputType>);
      return;
    }
    try {
      await login(input);
      navigate('/job-tracker');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="rounde mx-4 w-full max-w-md border-gray-200 md:border md:p-8"
      >
        <div className="mb-4">
          <h1 className="text-center text-2xl font-bold">Welcome Back</h1>
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
            <User className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
            {errors && (
              <span className="text-xs text-red-500">{errors.username}</span>
            )}
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
            <LockKeyhole className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
          <p className="mt-2 text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
        {loading ? (
          <Button disabled className="w-full border-none">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full border-none">
            Login
          </Button>
        )}

        <Separator className="mt-7" />

        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create new Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
