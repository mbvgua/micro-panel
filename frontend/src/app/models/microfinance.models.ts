enum MicrofinanceStatus {
  active = 'active',
  inactive = 'inactive',
  pending = 'pending',
}

export interface IMicrofinances {
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

export interface MicrofinanceResponse {
  code: string;
  status: string;
  message: string;
  data: {
    microfinance_id: string;
    microfinance_name: string;
    microfinance_email: string;
    microfinance_status: string;
  };
  metadata: {};
}

export interface IMicrofinance {
  id: string;
  name: string;
  email: string;
  status: string;
}
