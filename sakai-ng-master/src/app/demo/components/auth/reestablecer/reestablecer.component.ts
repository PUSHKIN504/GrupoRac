import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuario } from 'src/app/Service/service.service';
import { Reestb } from 'src/app/Models/UsuarioViewModel'; // Asegúrate de que esta ruta sea correcta
import { delay } from 'rxjs';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class ReestablecerComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  codigo: string = '';
  mostrarReestablecer: boolean = false;
  ocultr: boolean = true;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: ServiceUsuario,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const reestablecerContent = document.getElementById('reestablecer-content');
    setTimeout(() => {
      this.renderer.removeClass(reestablecerContent, 'd-none');
    }, 1700);
  }

  onReestablecer(): void {
    this.submitted = true;

    if (!this.mostrarReestablecer && this.usuario?.trim()) {
      this.userService.recuperacion(this.usuario).subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.mostrarReestablecer = true;
            this.ocultr = false;
            this.usuario = ''; 
          } else {
            this.errorMessage = 'Usuario incorrecto';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al verificar el usuario';
          console.error(err);
        }
      });
    } else if (this.contrasena.trim() && this.codigo?.trim()) {
      const usuario: Reestb = {
        Usu_Codigo: this.usuario,
        Usu_Contra: this.contrasena,
        Usu_ID: this.codigo // Asigna el ID del usuario aquí si es necesario
      };

      this.userService.reestablecer(usuario).subscribe({
        next: (data) => {
          console.log('Contraseña reestablecida con éxito:', data);
          this.router.navigate(['/login']); // Redirigir al login después del reestablecimiento
        },
        error: (err) => {
          this.errorMessage = 'Error al reestablecer la contraseña';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Todos los campos son obligatorios';
    }
  }
}
