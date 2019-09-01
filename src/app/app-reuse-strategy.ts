import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot, Route, PRIMARY_OUTLET } from '@angular/router';
import { LogComponent } from './page/message/log/log.component';
import { ListComponent } from './page/board/list/list.component';
import { ApplicationComponent } from './page/board/application/application.component';
import { SurveyComponent } from './page/board/survey/survey.component';
import { BillComponent } from './page/board/bill/bill.component';
import { AttendComponent } from './page/board/attend/attend.component';
import { QnaComponent } from './page/board/qna/qna.component';
import { LoginComponent } from './authentication/login/login.component';
import { BoardComponent } from './page/group/board/board.component';
import { FacilityComponent } from './page/common/facility/facility.component';
import { InfoComponent } from './page/group/info/info.component';
import { MessageComponent } from './page/group/message/message.component';
import { UsersComponent } from './page/common/users/users.component';
import { GroupUsersComponent } from './page/group/group-users/group-users.component';
import { InplaceComponent } from './page/board/inplace/inplace.component';
// import { AddMenualComponent } from './page/onestop/add-menual/add-menual.component';
import { DutyComponent } from './page/onestop/duty/duty.component';
import { EndConsultComponent } from './page/onestop/end-consult/end-consult.component';
import { OnestopListComponent } from './page/onestop/list/list.component';
import { MyListComponent } from './page/onestop/my-list/list.component';
import { MyTurnReportComponent } from './page/onestop/my-turn-report/turn-report.component';
import { ReceiptComponent } from './page/onestop/receipt/receipt.component';
import { SearchMenualComponent } from './page/onestop/search-menual/search-menual.component';
import { TurnReportComponent } from './page/onestop/turn-report/turn-report.component';
import { UrbanComponent } from './page/onestop/urban/urban.component';
import { CodeComponent } from './page/common/code/code.component';
import { OrganComponent } from './page/common/organ/organ.component';
import { AppmenuComponent } from './page/common/appmenu/appmenu.component';
import { BannerComponent } from './page/common/banner/banner.component';
import { MqttComponent } from './page/common/mqtt/mqtt.component';
import { BeaconComponent } from './page/common/beacon/beacon.component';
import { CategoryComponent } from './page/common/category/category.component';
import { GroupListComponent } from './page/common/group-list/group-list.component';
import { GroupListReviseComponent } from './page/common/group-list-revise/group-list-revise.component';
import { GroupStatComponent } from './page/common/group-stat/group-stat.component';
import { UsersDetailComponent } from './page/common/users-detail/users-detail.component';
import { OfficialComponent } from './page/common/official/official.component';
import { OfficialDetailComponent } from './page/common/official-detail/official-detail.component';
import { CoopComponent } from './page/common/coop/coop.component';
import { PropComponent } from './page/common/prop/prop.component';
import { DeptClsComponent } from './page/common/dept-cls/dept-cls.component';
import { ChnlPostComponent } from './page/common/chnl-post/chnl-post.component';
import { DashboardComponent } from './page/common/dashboard/dashboard.component';

export class CustomReuseStrategy implements RouteReuseStrategy {
    handlers: {[path:string]:DetachedRouteHandle} = {};
    
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      //새로 로그인 했을 때, 모든 reuse 제거
      if(route.component == LoginComponent){
        for(let key in this.handlers){
          this.handlers[key] = null;
        }
      }
      //Avoid second call to getter
      // let config: Route = route.routeConfig;
      //Don't store lazy loaded routes
      // return config && !config.loadChildren;
      let listComponent = [BoardComponent, FacilityComponent, InfoComponent, MessageComponent, UsersComponent, LogComponent,
                          ListComponent, ApplicationComponent, InplaceComponent, SurveyComponent, BillComponent, AttendComponent, QnaComponent,
                          DutyComponent, EndConsultComponent, ListComponent, MyListComponent, MyTurnReportComponent, ReceiptComponent, 
                          SearchMenualComponent, UrbanComponent,
                          CodeComponent, OrganComponent, FacilityComponent, AppmenuComponent, BannerComponent,
                          MqttComponent, BeaconComponent, CategoryComponent, GroupListComponent,
                          GroupListReviseComponent, GroupStatComponent, UsersComponent, UsersDetailComponent, OfficialComponent,
                          OfficialDetailComponent, CoopComponent, PropComponent, CoopComponent, DeptClsComponent,
                          ChnlPostComponent, DashboardComponent, GroupUsersComponent, OnestopListComponent];
      for (let item of listComponent)
        if (route.component == item)
            return true;
      
      return false;
    }
  
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      let path: string = this.getRoutePath(route);
      this.handlers[path] = handle;
      /*
        This is where we circumvent the error.
        Detached route includes nested routes, which causes error when parent route does not include the same nested routes
        To prevent this, whenever a parent route is stored, we change/add a redirect route to the current child route
      */
      let config: Route = route.routeConfig;
      if(config) {
        let childRoute: ActivatedRouteSnapshot = route.firstChild;
        let futureRedirectTo = childRoute ? childRoute.url.map(function(urlSegment) {
          return urlSegment.path;
        }).join('/') : '';
        let childRouteConfigs: Route[] = config.children;
        if(childRouteConfigs) {
          let redirectConfigIndex: number;
          let redirectConfig: Route = childRouteConfigs.find(function(childRouteConfig, index) {
            if(childRouteConfig.path === '' && !!childRouteConfig.redirectTo) {
              redirectConfigIndex = index;
              return true;
            }
            return false;
          });
          //Redirect route exists
          if(redirectConfig) {
            if(futureRedirectTo !== '') {
              //Current activated route has child routes, update redirectTo
              redirectConfig.redirectTo = futureRedirectTo;
            } else {
              //Current activated route has no child routes, remove the redirect (otherwise retrieval will always fail for this route)
              childRouteConfigs.splice(redirectConfigIndex, 1);
            }
          } else if(futureRedirectTo !== '') {
            childRouteConfigs.push({
              path: '',
              redirectTo: futureRedirectTo,
              pathMatch: 'full'
            });
          }
        }
      }
    }
  
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return !!this.handlers[this.getRoutePath(route)];
    }
  
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      let config: Route = route.routeConfig;
      //We don't store lazy loaded routes, so don't even bother trying to retrieve them
      if(!config || config.loadChildren) {
        return false;
      }
      return this.handlers[this.getRoutePath(route)];
    }
  
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      return future.routeConfig === curr.routeConfig;
    }
  
    getRoutePath(route: ActivatedRouteSnapshot): string {
      let namedOutletCount: number = 0;
      return route.pathFromRoot.reduce((path, route) => {
        let config: Route = route.routeConfig;
        if(config) {
          if(config.outlet && config.outlet !== PRIMARY_OUTLET) {
            path += `(${config.outlet}:`;
            namedOutletCount++;
          } else {
            path += '/';
          }
          return path += config.path
        }
        return path;
      }, '') + (namedOutletCount ? new Array(namedOutletCount + 1).join(')') : '');
    }
}