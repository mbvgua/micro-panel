import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Signup } from './components/signup/signup';
import { Sigin } from './components/sigin/sigin';
import { Pricing } from './components/pricing/pricing';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth/register/admin', component: Signup },
  { path: 'auth/login/admin', component: Sigin },
  { path: 'pricing', component: Pricing },
];
