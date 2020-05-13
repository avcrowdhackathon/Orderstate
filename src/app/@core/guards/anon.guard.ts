
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AnonGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  async canActivate() {
    const auth = await this.auth.isAuthenticated();
    if (auth) {
      console.log('authorized');
      return this.router.parseUrl('/home');
    }
    return true;
  }
}
