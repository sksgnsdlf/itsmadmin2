import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { LoginSession } from './services/login.session';
import { ORGAN_ROUTES } from './shared/sidebar/organ-menu-items';
import { Location } from '@angular/common';
@Injectable()
export class ChildGuard implements CanActivate {
    private links: Array<any> = [];
    private path: Array<any> = [];
    private organ_path: Array<any> = [];
    constructor(private router: Router, public loginSession: LoginSession, public location: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        var find = false;
        var full_url = location.href;
        var url = state.url
        this.organ_path = ORGAN_ROUTES;
        this.links = JSON.parse(localStorage.getItem('user_menu_links'));
        this.path = _.map(this.links, 'path');

        // if (full_url.includes('localhost')) {
        if (full_url.includes('/admin')) {
            if (this.path && this.path.length > 0) {
                this.organ_path = _.map(this.organ_path.filter(_ => this.path.includes(_.path)), 'path');
                find = this.organ_path.find(element => {
                    return element && url.includes(element);
                });
            }
        } else {
            if (this.path && this.path.length > 0) {
                find = this.path.find(element => {
                    return element && url.includes(element);
                });
            }
        }
        if (find)
            return true;
        else {
            this.router.navigate(['/authentication/401']);
        }
    }

    combineStr(str1: string, str2: string) {
        var temp = str1.split('/:')[0];
        var find = str2.indexOf(temp);
        str2 = str2.substr(0, find) + temp;

        return str2;
    }
}
