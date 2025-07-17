export enum UserRoles {
  admin = 'admin',
  support = 'support',
  member = 'member',
}

export enum UserStatus {
  active = 'active',
  pending = 'pending',
}

export interface IUsers {
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

export interface UserResponse {
  code: string;
  status: string;
  message: string;
  data: {
    users: IUsers[];
  };
  metadata: {};
}
