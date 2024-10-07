import { CanActivateFn } from '@angular/router';

export const appFrameGuard: CanActivateFn = (route, state) => {
  const allow = false;

  if (allow) {
    return true;
  } else {
    return false;
  }
};
