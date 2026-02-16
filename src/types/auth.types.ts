export interface AuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    token: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
