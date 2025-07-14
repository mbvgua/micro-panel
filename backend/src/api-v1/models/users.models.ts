export enum UserRoles {
  admin = "admin",
  support = "support",
  member = "member",
}

export enum UserStatus {
  active = "active",
  pending = "pending",
}

export interface Users {
  id: string;
  microfinance_id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone_number: string;
  hashed_password: string;
  role: UserRoles;
  status: UserStatus;
  created_at?: string;
  updated_at?: string;
  is_deleted?: string;
}
