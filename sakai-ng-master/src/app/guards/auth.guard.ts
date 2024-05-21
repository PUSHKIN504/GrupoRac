import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.cookieService.check('esAdmin') || this.cookieService.check('roleID');
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no ha iniciado sesión
      return false;
    }
    return true;
  }
}
