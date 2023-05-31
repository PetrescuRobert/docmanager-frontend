export interface LoginRequest {
  userDetails: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };
  token: string;
}
