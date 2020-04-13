import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm:any;
  err: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController
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

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      animated: true,
    });
    await loading.present();

    const resp = await this.authService
      .login(credentials)
      .catch((r) => {
        this.err = r.error;
      });

    this.loginForm.reset();

    if (resp) {
      await this.router.navigate(['/home']);
    }

    await loading.dismiss();
  }

}
