export interface responseBody {
  code: string;
  status: string;
  message: string;
  data: {
    path?: string;
    error?: string;
    microfinances?: {
      id?: string;
      reg_number?: string;
      name?: string;
      email?: string;
      status?: string;
    };
    users?: {
      id?: string;
      microfinance_id?: string;
      username?: string;
      email?: string;
      role?: string;
      status?: string;
    };
    loans?: {
      id: string;
      user_id: string;
      microfinance_id: string;
      amount: string;
      status: string;
      disbursment_date: string;
      guarantor_details: string;
    };
  };
  metadata?: {};
}

export interface errorResponse {
  error: {
    code: string;
    status: string;
    message: string;
    data: {};
    metadata: {};
  };
}
