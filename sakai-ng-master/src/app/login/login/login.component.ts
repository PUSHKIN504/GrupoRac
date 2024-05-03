import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}

  onButtonClick() {
    console.log('Button clicked...');
    this.router.navigate(['/app/dashboard']).then(success => {
        console.log('Redirection successful:', success);
    }).catch(err => {
        console.error('Redirection failed:', err);
    });
  }
}

