export interface UserCredentials {
    email: string;
    password: string;
    first_name: string; 
    last_name: string;
}

export interface User {
    user_id: number;
    email: string;
    created_at: string;
    first_name: string; 
    last_name: string;
}