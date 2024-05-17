import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuario } from '../../../../Service/service.service';
import { Reestb } from '../../../../Models/UsuarioViewModel';
import { delay } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html',
  providers: [MessageService],
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
  public codigo: string;
  mostrarreestablecer: boolean = false;
  ocultr: boolean = true;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: ServiceUsuario,
    private messageService: MessageService,
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
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Correo enviado con exito.', life: 3000 });

            console.log('entra');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario incorrecto.', life: 3000 });
          }
        },
        error: (err) => {
          this.errorMessage = '';
          console.error(err);
        }
      });
    }
     else if (this.contrasena?.trim() && this.codigo.trim()) {
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
                  this.router.navigate(['/login']);
                } else {
                }
              },
              error: (err) => {
                this.errorMessage = '';
                console.error(err);
              }
            });

          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Codigo incorrecto.', life: 3000 });
          }
        },
        error: (err) => {
          this.errorMessage = '';
          console.error(err);
        }
      });
    }
     

  }
}
