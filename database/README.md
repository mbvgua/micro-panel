# Database Schema

1. [Tables](##tables)
2. [Stored Procedures](##stored-procedures)
3. [Views](##views)
4. [Triggers](##triggers)
5. [Setup](##setup)

## Tables

The schema contains three main tables, each accompanied by a set of views and stored procedures for each. Listing them briefly, they are:
- users
- microfinances
- loans

### Microfinances

This lists all microfinances within the system. Also began with this as each newly created user will have a foreign key constraint to a sacco, hence it should be created prior. The columns contained within are:
```sql
    CREATE TABLE microfinances (
        id -- unique row identifier,
        reg_number -- uniquely identifies microfinance nation-wide. Usually government issued,
        name -- unique microfinance name to everyday users,
        email -- unique email to get reach of microfinance,
        phone_number -- unique phone number to reach microfinance via call,
        location VARCHAR(100) -- geographical location of the microfinance,
        created_at -- date when microfinance was added into the system,
        updated_at -- date when any subsequest updates were made on microfinance details,e.g name,
        status -- official status of sacco,(pending/active/inactive),
        is_deleted -- soft deletion of inacetive microfinance
    )
```
### Users

This will encompass all values dealing with the individual user contained in the appication. The table will have the following columns:
```sql
    CREATE TABLE users(
        id -- uniquely identify user within the system,
        microfinance_id -- foreign key associates a user to a given sacco,
        firstname -- users first name,
        lastname -- users last name,
        username -- unique identity of user within application,
        email -- unique user email for official communnication,
        phone_number -- unique user phone number for official communication,
        hashed_password -- users encrypted password,
        role -- gives users permisions. either admin/member/support,
        status -- status of account. either active/pending. defaults to pending,
        created_at -- captures exact time that the account was created,
        updated_at -- captures exact time when any subbsequent updates were perfomred on user,
        is_deleted -- allows for soft delete of user accounts,
    )
```

### Loans

This tracks all loans handed out or paid back within the system. It contains:

```sql
    CREATE TABLE loans(
        id -- uniquely identifies the user within the system,
        user_id -- foreign key linking back to the user,
        microfinance_id -- foreign key, linking back to the sacco,
        type -- lists the reason for the loan. either emergency/development/work/miscallenous,
        amount -- states loan amount takes. maximum is 7 zeros,
        interest_rate -- states the interest rate to 2 decimal places,
        repayment_period -- list repayment period in months. either 1/3/6/12 months.,
        status -- status of loan request. either pending/approved/rejected,
        disbursment_date -- captures exact time when the loan was released from system into users acc,
        guarantor_details -- all gurantor details, e.g id,contact,relationship,
        is_cleared -- mark cleared loans to improve users credit score, either 0 or 1. defaults to 0,
        is_deleted -- soft delete loans. unsure how it will be used, maybe for defaulted loans,
    )
```


## Stored Procedures

These help in performing repetitive queries with ease. Also greatly help to achieve separation of concerns in the backend, which results to cleaner code. The following are all stored procedures contained in the system:

- `addUser()` => adds new memebers to the system
- `getUserById()` => gets a user from db using their user id
- `getUserByNameOrEmail()` => gets a user either using their user_name or user_email
- `getAllUsers()` => gets all users from the db
- `getInactiveUsersById()` => gets all users whose `user_status` is still set to pending
- `activateUserById()` => change `user_status` from pending to active using their `id`
- `addMicrofinance()` => add new microfinance into the system
- `getAllMicrofinances()` => get list of all microfinances in the system
- `getUserLoansById()` => takes a `user_id` as input and returns all loans with a matching `user_id` column
- `addLoan()` => adds a new user loan into the system
- `getAllLoans()` => list all loans currenlt in system
- `getDetailedLoans()` => get human readable data of the current loan application in the system

## Views

Proxy tables that will make get operations from the front end. Currenly only 2 in the database:

- `microfinances_loans_view` => built to join the loans and microfinances data, to allow merging with another table for efficient data retirval. Gets all loans from the various microfinances.
- `detailed_loans_view` => merges the users table and microfinances_loans_view view allowing one to see the username and id on each loan handed out. This is the main view to be used in the loans module.

## Triggers

- disbursment_date_trigger => an `AFTER UPDATE` trigger on the loans column. Where when a loans status changes from `pending` to `approved`, the `disbursement_date` will automatically update to the `CURRENT TIMESTAMP`

## Setup

To run the setup/teardown script, you need to make it an executable first, then run it. This is by:
```bash
    $ chmod +x setup
    $ ./setup
```

> [!NOTE]
> To setup the database using the `setup` script contained, you will need to have `python3.10` or higher installed on your machine. Scripting was primarily done on `python3.13` and might fail in older versions.
>
> You also need to have `mysql-cli` installed. Do not confuse this with the `MySql Work Bench` application, as they are not the same. The latter cannot be run from the terminal and is a GUI app. Installing the former ensures an easier workflow.
>
> The `shebang` on the python script is primarily built to run on linux(and *nix) oprerating systems by extension. If you are running this code on a different operating system, say Mac or Windows, you need to figure out the path for linux on your system, then replace the shebang on the script accordingly. A good place to start might be running `which python` on your terminal.

