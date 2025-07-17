export enum MicrofinanceStatus {
  active = 'active',
  inactive = 'inactive',
  pending = 'pending',
}

export interface IMicrofinance {
  id: string;
  reg_number: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  status: MicrofinanceStatus;
  is_deleted?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MicrofinanceResponse {
  code: string;
  status: string;
  message: string;
  data: {
    microfinances: IMicrofinance[];
  };
  metadata: {};
}
