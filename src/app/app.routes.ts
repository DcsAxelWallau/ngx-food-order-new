import { Routes } from '@angular/router';
import { AuthGuard } from './backend/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivateChild: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsModule' },
  { path: 'order', loadChildren: './order/order.module#OrderModule' },
];
