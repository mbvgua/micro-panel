
delimiter #

CREATE VIEW viewSaccoLoans
AS
    SELECT saccos.id,saccos.sacco_name,saccos.sacco_email,loans.user_id,loans.loan_type,loans.loan_amount,loans.repayment_period,loans.loan_status,loans.guarantor_details FROM loans
    INNER JOIN saccos
    ON loans.sacco_id = saccos.id;
#

CREATE view viewLoanApplications
AS
    SELECT users.user_name,users.user_email,getSaccoLoans.sacco_name,getSaccoLoans.loan_type,getSaccoLoans.loan_amount,getSaccoLoans.repayment_period,getSaccoLoans.loan_status FROM getSaccoLoans
    INNER JOIN users
    ON getSaccoLoans.user_id = users.id;
#

delimiter ;
