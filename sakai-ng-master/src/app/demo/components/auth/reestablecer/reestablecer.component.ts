import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuario } from '../../../../Service/service.service';
import { Reestb } from '../../../../Models/UsuarioViewModel';
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
  mostrarreestablecer: boolean = false;
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
    this.ocultr=true;

    if (!this.mostrarreestablecer && this.usuario?.trim()) {
      this.userService.recuperacion(this.usuario).subscribe({
        next: (response) => {
          console.log(response);
          if (response.data && response.data.length > 0) {
            this.mostrarreestablecer = true;
            this.ocultr = false;
            this.usuario = ''; 
            console.log('entra');
          } else {
            this.errorMessage = 'Usuario incorrecto';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al verificar el usuario';
          console.error(err);
        }
      });
    }
     else  if (!this.contrasena && this.codigo.trim()) {
      this.userService.codigo(this.codigo).subscribe({
        next: (response) => {
          console.log(response);
          if (response.data && response.data.length > 0) {
            const usuario: Reestb = {
              Usu_Codigo: this.codigo,
              Usu_Contra: this.contrasena
            };

            this.userService.reestablecer(usuario).subscribe({
              next: (data) => {
                if (data.success) {
                  console.log('Contraseña reestablecida con éxito:', data);
                  this.router.navigate(['/login']);
                } else {
                  this.errorMessage = 'Error al reestablecer la contraseña';
                }
              },
              error: (err) => {
                this.errorMessage = 'Error al reestablecer la contraseña';
                console.error(err);
              }
            });

          } else {
            this.errorMessage = 'Codigo incorrecto';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al verificar el usuario';
          console.error(err);
        }
      });
    }
     

  }
}
