enum LoanTypes {
  emergency = 'emergency',
  development = 'development',
  work = 'work',
  miscallenous = 'miscallenous',
}

enum LoanStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

enum RepaymentPeriod {
  one = '1',
  three = '3',
  six = '6',
  twelve = '12',
}

export interface ILoans {
  id: string;
  user_id: string;
  sacco_id: string;
  loan_type: LoanTypes;
  loan_amount: number;
  interest_rate: number;
  repayment_period: RepaymentPeriod;
  loan_status?: LoanStatus;
  disbursment_date?: string;
  guarantor_details: {
    id: string;
    phone_number: string;
    email: string;
  };
}

//unique response since fetching from a view
//not a table
export interface DetailedLoans {
  loan_id: string;
  username: string;
  email: string;
  name: string;
  type: string;
  amount: string;
  repayment_period: string;
  status: string;
}

export interface LoanResponse {
  code: string;
  status: string;
  message: string;
  data: {
    detailed_loans: DetailedLoans[];
  };
  metadata: {};
}
