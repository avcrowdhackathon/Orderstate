import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: any;
  err: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
      await loading.dismiss();
    } else {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Wrong credentials',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

}
