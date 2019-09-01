import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { LoginSession } from './services/login.session';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(public loginSession: LoginSession) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean  {
        let result = this.loginSession.isAdmin();
        if(!result){
            alert('권한이 없습니다');
            return false;
        }else return true;
    }
}
