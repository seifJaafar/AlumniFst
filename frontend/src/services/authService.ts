import api from "@/lib/axios";
import { PublicUser, UserRole } from "@/contexts/AuthContext";

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  promotion?: string;
  promotionYear?: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

// Shape of your Spring Boot ApiResponse<AuthResponse>
interface AuthApiResponse {
  data: PublicUser;
  message: string;
}

export const authService = {
  register: async (payload: RegisterPayload): Promise<PublicUser> => {
    const { data } = await api.post<AuthApiResponse>("/auth/register", payload);
    return data.data;
  },

  login: async (payload: LoginPayload): Promise<PublicUser> => {
    const { data } = await api.post<AuthApiResponse>("/auth/login", payload);

    return data.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
