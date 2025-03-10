import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e : FormEvent) => {
    e.preventDefault();
    setTimeout(() => window.location.href = "/login", 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-sm  text-center">
          Enter a new password for your account.
        </p>
        <form className="mt-4" onSubmit={handleReset}>
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
          />
          <Button
            type="submit"
            className="w-full mt-4   py-2 rounded-md  transition"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
