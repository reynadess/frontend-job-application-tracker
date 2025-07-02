import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Call your API for forgot password
    toast.success("Check you email we have send you an email..");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-sm  text-center">
          Enter your email and we'll send you a password reset link.
        </p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
          />
          <Button
          onClick={ () => navigate("/reset-password") }
            type="submit"
            className="w-full mt-4   py-2 rounded-md  transition"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
