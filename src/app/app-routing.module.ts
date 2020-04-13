import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AnonGuard } from './@core/guards/anon.guard';
import { AuthGuard } from './@core/guards/auth.guard';
import { AuthResolver } from './@core/services/auth.resolver';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  resolve: {
    token: AuthResolver
  },
  children: [{
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'order/:id',
      loadChildren: () => import('./view-message/view-message.module').then(m => m.ViewMessagePageModule)
    }]
  }, {
    path: 'login',
    canActivate: [AnonGuard],
    component: LoginComponent,
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }]
}];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
