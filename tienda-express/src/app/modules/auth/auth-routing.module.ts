import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

// export const authRoutes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent
//   }
// ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    // RouterModule.forChild(authRoutes)
  ]
})
export class AuthRoutingModule { }
