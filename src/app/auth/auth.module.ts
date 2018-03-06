import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login/login-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
