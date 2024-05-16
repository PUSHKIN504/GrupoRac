import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate} from '@angular/router';
import { AuthService } from './Service/authGuard.service';



@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardLogin implements CanActivate {
    constructor(private authService: AuthService, private router: Router,  private cookieService: CookieService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        const isAdmin = this.cookieService.get('esAdmin') == 'true';
        console.log(isAdmin);
        if (isAdmin || this.authService.isUrlAllowedLogin(url)) {
          
          return true;
        }

        this.router.navigate(['/']);
        return false;
      }

   
   

    // canActivate(
    //   next: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   const url: string = state.url;

    //   const admin = this.cookieService.get('esAdmin').toString()

    //   if (admin != "true"){
    //       return true;
    //   }


    //   if (!this.authService.isUrlAllowed(url)) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    //   return true;
    // }
  }
