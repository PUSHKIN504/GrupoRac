import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuario } from 'src/app/Service/service.service';
import { Usuario } from 'src/app/Models/UsuarioViewModel'; // Asegúrate de que la ruta al modelo es correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usuario: string = '';
  contrase: string = '';
  errorMessage: string = ''; // Usa el modelo de Usuario para vincular los datos del formulario

  constructor(private router: Router, private userService: ServiceUsuario) {}

  onLogin() {
    this.userService.login(this.usuario, this.contrase).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          console.log('Login successful', "jjjjjjjjjjjjjj");
          // Asumiendo que 'data[0]' es el objeto de usuario y que 'Usu_Usua' es el nombre de usuario
          sessionStorage.setItem('usuario', JSON.stringify(data[0]["usu_Usua"])); 
          localStorage.setItem('esdra', data[0]["usu_Usua"]);
          console.log('Usuario guardado:', data[0]["usu_Usua"]);  // Verificar qué se guarda
          this.router.navigate(['/app/dashboard']);
        } else {
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
