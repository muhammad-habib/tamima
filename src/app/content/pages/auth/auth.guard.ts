import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../../core/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private authenticationService: AuthenticationService

    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    	console.log('gggg');
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
