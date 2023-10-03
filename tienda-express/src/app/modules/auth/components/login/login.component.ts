import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/services/classes/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login!: Login;

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(public authService: AuthService, private router: Router)
  {
    this.login = new Login();
  }

  onsubmit()
  {
    this.authService.Login(this.login.email, this.login.password).subscribe((response) => {
      
      this.router.navigate(['']);
    });

  }
}
