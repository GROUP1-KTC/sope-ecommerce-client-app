export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginErrors {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    username: string;
    roles: string[];
    accessToken: string;
}

export interface EmailRequest {
    email: string;
}

export interface VerifyEmailRequest {
    email: string;
    otp: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    name: string;
    email: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface RegisterErrors {
    username: string;
    password: string;
    name: string;
    email: string;
    gender: string;
}

export interface RegisterResponse {
    username: string;
    name: string;
    email: string;
    gender: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
}