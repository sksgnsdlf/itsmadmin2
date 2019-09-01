import { Component } from '@angular/core';
import { LoginSession } from './services/login.session';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_SERVER, TENANT, CLIENT_ID, CLIENT_SECRET } from '../config';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private http: HttpClient, private session: LoginSession, private router: Router) {
    // let queryString = window.location.search;
    // queryString = queryString.replace('?','');
    // let urlParams = new URLSearchParams(queryString);
    // let session_id = urlParams.get('session_id');
    // let redirect_uri = urlParams.get('redirect_uri');
    // if (session_id) {
      
    // }
  }
}