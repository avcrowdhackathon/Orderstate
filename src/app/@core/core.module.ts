import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { AnonGuard } from './guards/anon.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthResolver } from './services/auth.resolver';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        DataService,
        AuthService,
        AuthGuard,
        AnonGuard,
        AuthResolver,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthTokenInterceptor,
          deps: [AuthService, Router],
          multi: true,
        },
      ],
    } as ModuleWithProviders;
  }
}
