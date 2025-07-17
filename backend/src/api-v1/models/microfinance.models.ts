export enum MicrofinanceStatus {
  active = "active",
  inactive = "inactive",
  pending = "pending",
}

export interface Microfinances {
  id: string;
  reg_number: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  status: MicrofinanceStatus;
  created_at?: string;
  updated_at?: string;
}
