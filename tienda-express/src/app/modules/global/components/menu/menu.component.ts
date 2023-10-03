import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router, public authservice: AuthService)
  {
  }

  goHome()
  {
    window.location.href = "/";
  }

  goProducts()
  {
    window.location.href = "/products/index";
  }

  logout()
  {
    this.authservice.Logout();
    this.router.navigate(['']);
  }
}
