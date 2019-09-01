import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MomentModule } from 'angular2-moment';

import { CommonModule, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthenticatedHttpService } from './services/auth.http.service';
import { CustomReuseStrategy } from './app-reuse-strategy';
import { SafeHtmlPipeModule } from './pipe/safe-html/safe-html.module';

import localeKo from '@angular/common/locales/ko';
registerLocaleData(localeKo);

import { CKEDITOR_UPLOAD_URI } from '../config';
import { ItsmUiModule } from './itsm-ui/public_api';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { ApplyComponent } from './page/apply/apply.component';

import { ChildGuard } from './child.guard';
import { AdminGuard } from './admin.guard';
import { JwtHttpInterceptor } from './jwt.interceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [AppComponent, SpinnerComponent, FullComponent, BlankComponent, NavigationComponent, BreadcrumbComponent, SidebarComponent, ApplyComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['192.168.0.23:3000','192.168.0.47:3000','192.168.0.47:3001', 'itsmpohang.hssa.me:3000', 'smart.pohang.go.kr','https://smart.pohang.go.kr'],
      }
    }),
    HttpClientModule,

    SafeHtmlPipeModule,
    MomentModule,
    DragDropDirectiveModule,
    ItsmUiModule.forRoot({
      CKEDITOR_UPLOAD_URI: CKEDITOR_UPLOAD_URI
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: LocationStrategy, useClass: PathLocationStrategy} ,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    {provide: COMPOSITION_BUFFER_MODE, useValue: false},
    { provide: LOCALE_ID, useValue: 'ko' },
    ChildGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
