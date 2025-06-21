import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleReset = async (e: FormEvent) => {
        e.preventDefault();
        setTimeout(() => navigate('/login'), 2000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg p-6 shadow-md">
                <h2 className="text-center text-2xl font-bold">
                    Reset Password
                </h2>
                <p className="text-center text-sm">
                    Enter a new password for your account.
                </p>
                <form className="mt-4" onSubmit={handleReset}>
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                    />
                    <Button
                        type="submit"
                        className="mt-4 w-full rounded-md py-2 transition"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
