
delimiter #

CREATE VIEW microfinances_loans_view
AS
    SELECT microfinances.id,microfinances.name,microfinances.email,loans.user_id,loans.type,loans.amount,loans.repayment_period,loans.status,loans.guarantor_details FROM loans
    INNER JOIN microfinances
    ON loans.microfinance_id = microfinances.id;
#

CREATE view detailed_loans_view
AS
    SELECT users.username,users.email,microfinances_loans_view.name,microfinances_loans_view.type,microfinances_loans_view.amount,microfinances_loans_view.repayment_period,microfinances_loans_view.status FROM microfinances_loans_view
    INNER JOIN users
    ON microfinances_loans_view.id = users.microfinance_id;
#

delimiter ;
