import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Signup } from './components/signup/signup';
import { Sigin } from './components/sigin/sigin';
import { Pricing } from './components/pricing/pricing';
import { Error404 } from './components/error-404/error-404';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'auth',
    children: [
      { path: 'register/admin', component: Signup },
      { path: 'login/admin', component: Sigin },
    ],
  },
  { path: 'pricing', component: Pricing },
  // adding guard here prevents redirect on login
  // TODO: fix that
  { path: 'dashboard', component: Dashboard },
  // 404 error page
  { path: '**', component: Error404 },
];
