import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { environment } from '../../../environments/environment';

const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class AuthResolver implements Resolve<void> {
  // constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return;// this.authService.setup();
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token: any;

  user: Network.Account;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  async setup() {
    const ret = await Storage.get({ key: 'token' });
    this.token = JSON.parse(ret.value);
    console.log(this.token);
    if (this.token) {
      this.user = await this.http
        .get<Network.Account>(environment.api_url + '/account')
        .toPromise();
      console.log(this.user);
    }
  }

  isAuthenticated() {
    console.log('is?', !!this.token);
    return !!this.token;
  }

  async login(credentials) {

    const data = {
      username: encodeURIComponent(credentials.username),
      password: encodeURIComponent(credentials.password),
      grant_type: encodeURIComponent('password'),
      client_secret: encodeURIComponent(environment.client_secret),
      client_id: encodeURIComponent(environment.client_id),
      rememberMe: encodeURIComponent(credentials.rememberMe),
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret));

    const body = this.getFormUrlEncoded(data);

    return this.http
      .post(environment.oauth_url + '/token', body, { headers })
      .toPromise()
      .then(async (resp: any) => {
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + resp.expires_in);
        resp.expires_at = expiredAt.getTime();
        await Storage.set({ key: 'token', value: JSON.stringify(resp) });
        this.token = resp;
        this.user = await this.http
          .get<Network.Account>(environment.api_url + '/account')
          .toPromise();
        return resp;
      });
  }

  private getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property of Object.keys(toConvert)) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  async logout() {
    // await this.http.post('api/logout', {}).toPromise();
    await Storage.clear();
    this.token = null;
    await this.router.navigateByUrl('/login');
  }
}
