# Database Schema

1. [Tables](##tables)
2. [Stored Procedures](##stored-procedures)
3. [Views](##views)
4. [Triggers](##triggers)
5. [Setup](##setup)

## Tables

The schema contains three main tables, each accompanied by a set of views and stored procedures for each. Listing them briefly, they are:
- users
- saccos
- loans

### Saccos

This lists all saccos within the system. Also began with this as each newly created user will have a foreign key constraint to a sacco, hence it should be created prior. The columns contained within are:
```
    CREATE TABLE saccos (
        id -> unique row identifier,
        registration_number -> uniquely identifies sacco nation-wide. Government issued,
        sacco_name -> unique sacco name to everyday users,
        sacco_email -> unique email to get reach of sacco staff,
        sacco_phone_number -> unique phone number to reach sacco staff via call,
        location VARCHAR(100) -> geographical location of the sacco,
        created_at -> date when sacco was added into the system,
        updated_at -> date when any subsequest updates were made on sacco details,e.g name,
        sacco_status -> official status of sacco,(pending/active/inactive)
    )
```
### Users

This will encompass all values dealing with the individual user contained in the appication. The table will have the following columns:
```
    CREATE TABLE users(
        id -> uniquely identify user within the system,
        sacco_id -> foreign key associates a user to a given sacco,
        first_name -> users first name,
        last_name -> users last name,
        user_name -> unique identity of user within application,
        user_email -> unique user email for official communnication,
        phone_number -> unique user phone number for official communication,
        hashed_password -> users encrypted password,
        user_role -> gives users permisions. either admin/member/support,
        user_status -> status of account. either active/pending. defaults to pending,
        created_at -> captures exact time that the account was created,
        updated_at -> captures exact time when any subbsequent updates were perfomred on user,
        is_deleted -> allows for soft delete of user accounts,
    )
```

### Loans

This tracks all loans handed out or paid back within the system. It contains:

```
    CREATE TABLE loans(
        id -> uniquely identifies the user within the system,
        user_id -> foreign key linking back to the user,
        sacco_id -> foreign key, linking back to the sacco,
        loan_type -> lists the reason for the loan. either emergency/development/work/miscallenous,
        loan_amount -> states loan amount takes. maximum is 7 zeros,
        interest_rate -> states the interest rate to 2 decimal places,
        repayment_period -> list repayment period in months. either 1/3/6/12,
        loan_status -> status of loan request. either pending/approved/rejected,
        disbursment_date -> captures exact time when the loan was released from system into users acc,
        guarantor_details -> all gurantor details, e.g id,contact,relationship,
    )
```


## Stored Procedures

These help in performing repetitive queries with ease. Also greatly help to achieve separation of concerns in the backend, which results to cleaner code. The following are all stored procedures contained in the system:

- addUser() => adds new memebers to the system
- getUserById() => gets a user from db using their user id
- getUserByNameOrEmail() => gets a user either using their user_name or user_email
- getAllUsers() => gets all users from the db
- getInactiveUsers() => gets all users whose `user_status` is still set to pending
- activateUserById() => change `user_status` from pending to active using their `id`
- createMicrofinance() => add new microfinance into the system
- getAllMicrofinances() => get list of all microfinances in the system
- getUserLoansById() => takes a `user_id` as input and returns all loans with a matching `user_id` column
- addLoan() => adds a new loan into the system
- getAllLoans() => list all loans currenlt in system
- detailedLoans() => get human readable data of the current loan application in the system

## Views

Proxy tables that will make get operations from the front end. Currenly only 2 in the database:

- viewSaccoLoans => built to join the loans and saccos data, to allow merging with another table for efficient data retirval. Gets all loans from the various saccos.
- viewLoanApplications => merges the users table and viewSaccoLoans view allowing one to see the username and id on each loan handed out. This is the main view to be used in the loans module.

## Triggers

> [!NOTE]
> To build an `ON UPDATE` trigger on the loans column. Where when a loans status changes from `pending` to `active`, the `disbursement_date` will automatically update to the `CURRENT TIMESTAMP`

## Setup

To run the setup/teardown script, you need to make it an executable first, then run it. This is by:
```
    $ chmod +x setup
    $ ./setup
```

> [!WARNING]
> To setup the database using the `setup` script contained, you will need to have `python3.10` or higher install on your machine. Scripting was primarily done on `python3.13` and might fail in older versions.
> You also need to have `mysql-cli` installed. Most people might confuse this with the `MySql Work Bench`, but they are not the same, as the latter cannot be run from the terminal. Installing the former ensures an easier workflow.
> The `shebang` on the python script is primarily built to run on linux(and *nix) oprerating systems by extension. If you are running this code on a different operating system, say Mac or Windows, you need to figure out the path for linux on your system, then replace the shebang on the script accordingly. A good place to start might be running `which python` on your terminal.

