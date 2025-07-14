# Routes

This subdirectory will help ensure routing requests to the appropriate handlers. There are four main files:

1. **microfinances.routes.ts** => holds routes incharge of the microfinances routes. Includes:
    - `createMicrofinance()` - adds a new microfinance to the system 
    - `getMicrofinances()` - gets a list of all microfinances currently in the system

> [!NOTE]
> Since each member/admin **MUST** belong to a microfinance, its recommended that you begin building from this endpoint by adding a list of microfinances that you would like to have in your system, then move on to the other endpoints.

2. **admin.routes.ts** => holds the admin routes responsible for admin tasks. Logic is contained [here](../controllers/admin.controllers.ts). It includes:
    - `adminRegistration()` - creates new admins into the system
    - `adminLogin()` - log in existing admins into the system

3. **members.routes.ts** => holds routes incharge of the members module contained [here](../controllers/member.controllers.ts). Contains:
    - `createMember()` - adds a new member into the system
    - `getMembers()` - gets a list of all members within the system
    - `activateMember()` - changes a members status from pending to active. Applied to all members save for the admins, who are registered as active.

3. **loans.routes.ts** => holds the routes incharge of loan application from the [loan controller](../controllers/loan.controllers.ts). Includes:
    - `applyLoan()` - makes new loan application. Only possible for members who are active.
    - `getLoans()` - gets a list of all applied loans currently in the system

