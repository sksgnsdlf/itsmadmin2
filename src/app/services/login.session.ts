import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_SERVER, CLIENT_ID, CLIENT_SECRET, API, TENANT } from '../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { resolve } from 'dns';

@Injectable({ providedIn: 'root' })
export class LoginSession implements CanActivate {
    jwtHelper: JwtHelperService = new JwtHelperService();
    isApply:boolean = false;
    profile: any = {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let queryString = window.location.search;
        queryString = queryString.replace('?','');
        let urlParams = new URLSearchParams(queryString);
        let session_id = urlParams.get('session_id');
        let redirect_uri = urlParams.get('redirect_uri');
        if (session_id) {
            this.http.post(`${AUTH_SERVER}/${TENANT}/token`, {
                grant_type: 'password',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                session_id: session_id
            })
            .subscribe(data=>{
                if(redirect_uri == '/apply') this.isApply = true;
                this.login(null, null, data)
                .then(_=>{ 
                    this.route.navigateByUrl(redirect_uri); 
                    if(redirect_uri) return false;
                    else return true;
                })
                .catch(err=>{
                    console.error(err);
                    if(redirect_uri) return false;
                    else return true;
                });
            }, err=>{ 
                this.route.navigate(['/authentication/login']); 
                if(redirect_uri) return false;
                else return true;
            });
            
        } else if (this.isAuthenticated()) {
            return true;
        } else {
            this.route.navigate(['/authentication/login']);
            return false;
        }
    }

    constructor(private http: HttpClient, private route: Router) {
        this.profile.name = localStorage.getItem('user_name');
        this.profile.id = localStorage.getItem('user_id');
        this.profile.org_no = localStorage.getItem('user_org_no');
        this.profile.org_nm = localStorage.getItem('user_org_nm');
        this.profile.user_role = localStorage.getItem('user_role');
        this.profile.user_no = localStorage.getItem('user_no');
        this.profile.official_id = localStorage.getItem('user_official_id');
        this.profile.cp_no = localStorage.getItem('user_cp_no');
        this.profile.partner_no = localStorage.getItem('user_partner_no');
        this.profile.partner_nm = localStorage.getItem('user_partner_nm');
        this.profile.user_auth = localStorage.getItem('auth_nm');
        this.profile.office_tel_no = localStorage.getItem('office_tel_no');

        this.profile.menu_down_links = JSON.parse(localStorage.getItem('user_menu_links'));
        this.profile.menu_up_links = JSON.parse(localStorage.getItem('user_menu_up_links'));
        this.profile.menu_auths = JSON.parse(localStorage.getItem('user_menu_auths'));
    }

    login(id, pw, token = null) {
        return (token ? Promise.resolve(token) : (this.http.post(`${AUTH_SERVER}/${TENANT}/token`, {
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            username: id,
            password: pw
        })
            .toPromise()))
            .then(data => {
                let decoded = this.jwtHelper.decodeToken(data.access_token);
                if (decoded.payload.user_role != "3" && !decoded.payload.isAdmin) {
                    // throw {status: 'no_auth'};
                }
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expires_at', '' + data.expires_in);
            })
            .then(() => {
                return this.http.get(`${API}/profile/admin`).toPromise();
            })
            .then((user: any) => {
                localStorage.setItem('user_id', id);
                localStorage.setItem('user_org_nm', user.org_nm);
                localStorage.setItem('user_no', user.user_no);
                localStorage.setItem('user_name', user.name);
                localStorage.setItem('user_cp_no', user.cp_no);
                localStorage.setItem('user_dept_id', user.dept_id);
                localStorage.setItem('user_office_nm', user.office_nm);
                localStorage.setItem('user_official_id', user.official_id);
                localStorage.setItem('user_partner_no', user.partner_no);
                localStorage.setItem('user_partner_nm', user.partner_nm);
                localStorage.setItem('user_tel_no', user.tel_no);
                localStorage.setItem('user_org_no', user.org_no);
                localStorage.setItem('user_role', user.user_role);
                //sys : 관리자, off : 공무원, man :관리자(정,부), sub : 게시판별 관리자, usr : 일반시민
                localStorage.setItem('user_auth', user.auth_nm);
                localStorage.setItem('user_accnt', user.login_accnt);
                localStorage.setItem('office_tel_no', user.office_tel_no);

                this.profile.id = id;
                this.profile.name = user.name;
                this.profile.org_nm = user.org_nm;
                this.profile.user_no = user.user_no;
                this.profile.cp_no = user.cp_no;
                this.profile.dept_id = user.dept_id;
                this.profile.office_nm = user.office_nm;
                this.profile.official_id = user.official_id;
                this.profile.partner_no = user.partner_no;
                this.profile.partner_nm = user.partner_nm;
                this.profile.tel_no = user.tel_no;
                this.profile.org_no = user.org_no;
                this.profile.user_role = user.user_role;
                this.profile.user_auth = user.auth_nm;
                this.profile.office_tel_no = user.office_tel_no;
                if(this.isApply){
                    return Promise.resolve();
                }else{
                    return this.getAuthLinks()
                        .then(
                            (menu: any) => {
                                console.log('get auth links');
                                if (menu.code != "NO_AUTH") {
                                    this.profile.menu_down_links = menu.links;
                                    this.profile.menu_up_links = menu.up_links;
                                    this.profile.menu_auths = menu.auths;

                                    localStorage.setItem('user_menu_links', JSON.stringify(menu.links));
                                    localStorage.setItem('user_menu_up_links', JSON.stringify(menu.up_links));
                                    localStorage.setItem('user_menu_auths', JSON.stringify(menu.auths));
                                }
                                else {
                                    this.profile.menu_down_links = [];
                                    this.profile.menu_up_links = [];
                                    this.profile.menu_auths = [];

                                    localStorage.setItem('user_menu_links', JSON.stringify([]));
                                    localStorage.setItem('user_menu_up_links', JSON.stringify([]));
                                    localStorage.setItem('user_menu_auths', JSON.stringify([]));
                                }       
                            }
                        );
                }
            })
    }

    logout() {
        this.profile = {};
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        localStorage.clear();
        this.route.navigate(['/authentication/login']);
    }

    refreshToken() {

    }

    isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < +expiresAt * 1000;
    }

    getAuthLinks() {
        // return this.http.get(`${API}/menu/menu_auth`).map(_ => _).toPromise();
        return this.http.get(`${API}/menu/menu_auth_admin`).map(_ => _).toPromise();
    }

    isAdmin(only_system = true) {
        if (!this.profile.menu_auths || this.profile.menu_auths.length == 0) {
            return false;
        }
        if (only_system)
            return this.profile.menu_auths.findIndex((element) => { return element == '000' }) == -1 ? false : true;
        else
            return this.profile.menu_auths.findIndex((element) => { return element == '000' || element == '005' }) == -1 ? false : true;
    }
    isOrgan(only_system = true) {
        if (!this.profile.menu_auths || this.profile.menu_auths.length == 0) {
            return false;
        }
        if (only_system)
            return this.profile.menu_auths.findIndex((element) => { return element == '090' }) == -1 ? false : true && this.profile.user_auth == 'man';
    }
    isGrantedUser() {
        return this.isAdmin(false);
    }
    checkAdminAndGetOrg() {
        return this.isAdmin() ? -1 : this.profile.org_no;
    }
}