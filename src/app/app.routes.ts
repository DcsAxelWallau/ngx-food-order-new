import { Routes } from '@angular/router';

import { AuthGuard } from './backend/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivateChild: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];
