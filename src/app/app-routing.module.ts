import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginSession } from './services/login.session';
import { ApplyComponent } from './page/apply/apply.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [LoginSession],
    children: [
      // { path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
      { path: '', redirectTo: '/common/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
      { path: 'common', loadChildren: './page/common/common.module#CommonModule' },
      { path: 'message', loadChildren: './page/message/message.module#MessageModule' },
      { path: 'onestop', loadChildren: './page/onestop/onestop.module#OnestopModule' },
      { path: 'group', loadChildren: './page/group/group.module#GroupModule' },
      { path: 'board', loadChildren: './page/board/board.module#BoardModule' },
      { path: 'map', loadChildren: './page/map/map.module#MapModule' },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: 'apply',
    component: ApplyComponent,
    canActivate: [LoginSession]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
