export enum LoanTypes {
  emergency = "emergency",
  development = "development",
  work = "work",
  miscallenous = "miscallenous",
}

export enum LoanStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum RepaymentPeriod {
  one = "1",
  three = "3",
  six = "6",
  twelve = "12",
}

export interface Loans {
  id: string;
  user_id: string;
  microfinance_id: string;
  type: LoanTypes;
  amount: number;
  interest_rate: number;
  repayment_period: RepaymentPeriod;
  status?: LoanStatus;
  disbursment_date?: string;
  guarantor_details: {
    id: string;
    phone_number: string;
    email: string;
  };
}
