import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private afAuth:  AngularFireAuth,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    	console.log('gggg',this.authenticationService.isLoggedIn());
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
//        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/login']);
        return false;
    }
}
