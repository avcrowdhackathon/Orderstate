import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm;
  err: any;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.controls.username.setValue('emma');
    this.loginForm.controls.password.setValue('user');
  }

  ngOnInit() {
  }


  async onSubmit(credentials) {
    this.err = null;
    this.loading = true;
    const resp = await this.authService
      .login(credentials)
      .catch((r) => {
        this.err = r.error;
      });

    this.loginForm.reset();
    this.loading = false;
    if (resp) {
      await this.router.navigate(['/home']);
    }
  }

}
