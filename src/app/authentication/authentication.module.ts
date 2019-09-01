import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './401/unauthorized.component';

import { AuthenticationRoutes } from './authentication.routing';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(AuthenticationRoutes), NgbModule],
  declarations: [NotFoundComponent, LoginComponent, SignupComponent, LockComponent, UnauthorizedComponent]
})
export class AuthenticationModule {}
