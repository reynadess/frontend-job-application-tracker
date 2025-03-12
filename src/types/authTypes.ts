import { LoginInputType, SignupInputType } from "@/schema/userSchema";


//Auth types
export type User = {
    id: string;
    username: string;
};

export type UserState = {
  user: User | null;
  signup: (input: SignupInputType) => Promise<void>;
  login: (input: LoginInputType) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  loading: boolean;
  isAuthenticated: boolean;
};