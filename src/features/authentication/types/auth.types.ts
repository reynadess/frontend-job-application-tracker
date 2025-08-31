import { LoginInputType, SignupInputType } from "../schemas/auth.schema";

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AuthActions {
  signup: (input: SignupInputType) => Promise<void>;
  login: (input: LoginInputType) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;