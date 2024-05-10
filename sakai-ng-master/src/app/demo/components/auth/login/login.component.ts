import { Component, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { delay, identity } from 'rxjs';
import { ServiceUsuario } from 'src/app/Service/service.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{
  
    usuario: string = '';
    
    contrasena: string = '';

    rememberMe: boolean;

    submitted: boolean = false;
    
    errorMessage: string = ''; // Usa el modelo de Usuario para vincular los datos del formulario
  
    constructor(private router: Router, private userService: ServiceUsuario, private renderer: Renderer2) {}

    ngOnInit(): void {
      const loginContent = document.getElementById('login-content');

      setTimeout(() => {
        this.renderer.removeClass(loginContent, 'd-none');
      }, 1700);

    }

    onLogin() {
      this.submitted = true;

      if(this.contrasena?.trim() && this.usuario?.trim()){
        this.userService.login(this.usuario, this.contrasena).subscribe({
          next: (data) => {
            if (data.length > 0) {
              console.log('Login successful', data);
              this.router.navigate(['/app/dashboard']);
              // Redirecciona al usuario o realiza acciones post-login
            } else {
              // Maneja la respuesta vacía como credenciales incorrectas
              this.errorMessage = 'Usuario o contraseña incorrectos';
              console.error('Login failed: Incorrect credentials');
            }
          },
          error: (error) => {
            this.errorMessage = 'Error en la conexión con el servidor';
            console.error('Login failed:', error);
          }
        });
      }
     
    }
  }
  