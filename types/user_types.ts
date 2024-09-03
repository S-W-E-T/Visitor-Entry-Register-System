export interface UserSignUpData {
  photoUrl?: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface UseSignupResult {
  error: string | null;
  loading: boolean;
  signUpUser: (data: SignUpData) => Promise<boolean>;
}

export interface SignUpData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    accessApproved: boolean;
  };
}
