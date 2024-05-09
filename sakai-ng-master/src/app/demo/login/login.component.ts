import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuario } from 'src/app/Service/service.service';
import { Usuario } from 'src/app/Models/UsuarioViewModel'; // Asegúrate de que la ruta al modelo es correcta
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  
})

export class LoginComponent implements OnInit{
  
  routeItems: MenuItem[] = [];
  usuario: string = '';
  contrase: string = '';
  errorMessage: string = ''; // Usa el modelo de Usuario para vincular los datos del formulario

  constructor(private router: Router, private userService: ServiceUsuario) {}

  ngOnInit(): void {
    this.routeItems = [
      { label: 'Personal', routerLink: 'personal' },
      { label: 'Seat', routerLink: 'seat' },
      { label: 'Payment', routerLink: 'payment' },
      { label: 'Confirmation', routerLink: 'confirmation' },
    ];
  }

  onLogin() {
    this.userService.login(this.usuario, this.contrase).subscribe({
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
