import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const auth = inject(Auth)

  if(auth.showStatus()){
    //allow access. must return boolean
    return true
  } else {
    //deny access. return boolean 
    router.navigate(['/auth/login/admin'])
    return false
  }
};
