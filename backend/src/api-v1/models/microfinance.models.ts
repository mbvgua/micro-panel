export enum MicrofinanceStatus {
  active = "active",
  inactive = "inactive",
  pending = "pending",
}

export interface Microfinances {
  id: string;
  registration_number: string;
  sacco_name: string;
  sacco_email: string;
  sacco_phone_number: string;
  location: string;
  sacco_status: MicrofinanceStatus;
  created_at?: string;
  updated_at?: string;
}
