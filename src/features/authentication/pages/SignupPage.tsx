import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Separator } from '@/shared/components/ui/separator';
import {
    Loader2,
    LockKeyhole,
    Mail,
    Notebook,
    User,
    User2,
} from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SignupInputType, userSignupSchema } from '../schemas/auth.schema';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PAGE_TITLES } from '@/shared/utils/pageTitle';

const SignupPage = () => {
    const [input, setInput] = useState<SignupInputType>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const { signup, loading } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<SignupInputType>>({});

    usePageTitle(PAGE_TITLES.SIGNUP);
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const result = userSignupSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputType>);
            return;
        }
        // reseting the fields
        try {
            await signup(input);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={submitHandler}
                className="rounde mx-4 w-full max-w-md border-gray-200 md:border md:p-8"
            >
                <div className="mb-4">
                    <h1 className="text-center text-2xl font-bold">
                        Create Your Account to Start Tracking Jobs!
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="mb-4">
                        <div className="relative">
                            <Input
                                onChange={changeEventHandler}
                                value={input.firstName}
                                type="text"
                                name="firstName"
                                placeholder="John"
                                className="pl-10 focus-visible:ring-1"
                            />
                            <User2 className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
                            {errors && (
                                <span className="text-xs text-red-500">
                                    {errors.firstName}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="relative">
                            <Input
                                onChange={changeEventHandler}
                                value={input.lastName}
                                type="text"
                                name="lastName"
                                placeholder="Doe"
                                className="pl-10 focus-visible:ring-1"
                            />
                            <Notebook className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
                            {errors && (
                                <span className="text-xs text-red-500">
                                    {errors.lastName}
                                </span>
                            )}
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
                        <User className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
                        {errors && (
                            <span className="text-xs text-red-500">
                                {errors.username}
                            </span>
                        )}
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
                        <Mail className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
                        {errors && (
                            <span className="text-xs text-red-500">
                                {errors.email}
                            </span>
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
                            <span className="text-xs text-red-500">
                                {errors.password}
                            </span>
                        )}
                    </div>
                </div>
                {loading ? (
                    <Button disabled className="w-full border-none">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full border-none">
                        Signup
                    </Button>
                )}

                <Separator className="mt-7" />

                <p className="mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login.
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
