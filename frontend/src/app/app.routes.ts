import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  //NOTE: only eagerly load the home route. Lazy load all the rest
  { path: '', component: Home },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./components/pricing/pricing').then((m) => m.Pricing),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./components/signup/signup').then((m) => m.Signup),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/sigin/sigin').then((m) => m.Sigin),
      },
    ],
  },
  // add some path redirects
  { path: 'register', redirectTo: 'auth/register' },
  { path: 'login', redirectTo: 'auth/login' },
  { path: 'signup', redirectTo: 'auth/register' },
  { path: 'signin', redirectTo: 'auth/login' },
  // admin panel
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: 'microfinances',
        loadComponent: () =>
          import('./components/dashboard/microfinances/microfinances').then(
            (m) => m.Microfinances,
          ),
        children: [
          //get & delete microfinances
          {
            path: 'get-microfinances',
            loadComponent: () =>
              import(
                './components/dashboard/microfinances/get-microfinances/get-microfinances'
              ).then((m) => m.GetMicrofinances),
          },
          //add microfinance
          {
            path: 'add-microfinances',
            loadComponent: () =>
              import(
                './components/dashboard/microfinances/add-microfinances/add-microfinances'
              ).then((m) => m.AddMicrofinances),
          },
          //update microfinance
          {
            path: 'update-microfinances',
            loadComponent: () =>
              import(
                './components/dashboard/microfinances/update-microfinances/update-microfinances'
              ).then((m) => m.UpdateMicrofinances),
          },
        ],
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/dashboard/users/users').then((m) => m.Users),
        children: [
          //get & delete users
          {
            path: 'get-users',
            loadComponent: () =>
              import('./components/dashboard/users/get-users/get-users').then(
                (m) => m.GetUsers,
              ),
          },
          //add users
          {
            path: 'add-users',
            loadComponent: () =>
              import('./components/dashboard/users/add-users/add-users').then(
                (m) => m.AddUsers,
              ),
          },
          //update users
          {
            path: 'update-users',
            loadComponent: () =>
              import(
                './components/dashboard/users/update-users/update-users'
              ).then((m) => m.UpdateUsers),
          },
        ],
      },
      {
        path: 'loans',
        loadComponent: () =>
          import('./components/dashboard/loans/loans').then((m) => m.Loans),
        children: [
          //get & delete loans
          {
            path: 'get-loans',
            loadComponent: () =>
              import('./components/dashboard/loans/get-loans/get-loans').then(
                (m) => m.GetLoans,
              ),
          },
          //add loan
          {
            path: 'add-loans',
            loadComponent: () =>
              import('./components/dashboard/loans/add-loans/add-loans').then(
                (m) => m.AddLoans,
              ),
          },
          //update loan
          {
            path: 'update-loans',
            loadComponent: () =>
              import(
                './components/dashboard/loans/update-loans/update-loans'
              ).then((m) => m.UpdateLoans),
          },
        ],
      },
    ],
  },
  // 404 error page for wildcard route
  {
    path: '**',
    loadComponent: () =>
      import('./components/error-404/error-404').then((m) => m.Error404),
  },
];
