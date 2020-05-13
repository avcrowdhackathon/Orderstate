
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  async canActivate() {
    const auth = await this.auth.isAuthenticated();
    if (!auth) {
      console.log('not authorized');
      return this.router.parseUrl('/login');
    }
    return true;
  }
}
