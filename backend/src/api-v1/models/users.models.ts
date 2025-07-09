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
  sacco_id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  user_email: string;
  phone_number: string;
  hashed_password: string;
  user_role: UserRoles;
  user_status: UserStatus;
  created_at?: string;
  updated_at?: string;
  is_deleted?: string;
}
